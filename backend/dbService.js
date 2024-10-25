const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config(); 

let instance = null; 

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});


connection.connect((err) => {
     if(err){
        console.log(err.message);
     }
     console.log('db ' + connection.state);  
});

class DbService{
   static getDbServiceInstance(){ 
      return instance? instance: new DbService();
   }

   async getAllData(){
      try{
           // use await to call an asynchronous function
         const response = await new Promise((resolve, reject) => 
            {
               const query = "SELECT * FROM users;"
               connection.query(query, (err, results) => {
                  if(err) reject(new Error(err.message));
                  else resolve(results);
               })
            })
  
         return response
      } catch(error){
         console.log(error)
      }
   }


   async insertNew(name, email, age, salary, password){
         try{
            const sign_up_time = new Date()
            const insertId = await new Promise((resolve, reject) => 
            {
               const query = "INSERT INTO users (name,email,age,salary,password,sign_up_time) VALUES (?,?,?,?,?,?);"
               connection.query(query, [name,email,age,salary,password,sign_up_time], (err, result) => {
                   if(err) reject(new Error(err.message));
                   else resolve(result.insertId);
               })
            })
            console.log(insertId)
            return{
               id: insertId,
               name: name,
               email: email,
               age:age,
               salary:salary,
               password: password,
               sign_up_time: sign_up_time
            }
         } catch(error){
               console.log(error)
         }
   }
                  
   async deleteRowById(id){
         try{
            id = parseInt(id, 10)
            // use await to call an asynchronous function
            const response = await new Promise((resolve, reject) => 
               {
                  const query = "DELETE FROM users WHERE id = ?;"
                  connection.query(query, [id], (err, result) => {
                     if(err) reject(new Error(err.message));
                     else resolve(result.affectedRows);
                  });
               }
            );
            console.log(response);  // for debugging to see the result of select
            return response === 1? true: false;
         }  catch(error){
            console.log(error);
         }
   }

  
  async updateNameById(id, newName, newEmail, newPassword){
      try{
         console.log("dbService: ");
         console.log("Original ID: " ,id);
         console.log(newName)
         console.log(newEmail)
         console.log(newPassword)
         const response = await new Promise((resolve, reject) => 
            {
               const query = "UPDATE users SET name = ?,email = ?,password = ?, updated_time= CURRENT_TIMESTAMP WHERE id = ?"
               connection.query(query, [newName,newEmail,newPassword,id], (err, result) => {
                  if(err) reject(new Error(err.message));
                  else resolve(result.affectedRows);
               });
            });
         // console.log(response);  // for debugging to see the result of select
         return response === 1? true: false;
      }catch(error){
         console.log(error);
      }
  }

  async getExisting(email, password){
   try{
      const response = await new Promise((resolve, reject) => {
         const query = "SELECT * FROM users WHERE email=? AND password=?"
         connection.query(query,[email,password], (err, results) =>{
            if (err) return reject (new Error(err.message))
            if (results.length === 0){
               return reject(new Error("Invalid Credentials!"))
            }
            resolve(results)
         })
      })

      const userId = response[0].id
      await new Promise((resolve,reject) => {
         const query = "UPDATE users SET sign_in_time = CURRENT_TIMESTAMP where id = ?"
         connection.query(query,[userId], (err, result) => {
            if (err) return reject(new Error(err.message))
            resolve(result.affectedRows)  
         })
      })

      return response[0]
   }catch(error){
      console.error(error.message)
      response.json({error:error.message})
   }}

   async queryDatabase(query, params){
      return new Promise((resolve,reject) =>{
         connection.query(query,params, (err, results) => {
            if (err){
               reject(new Error(err.message))
            } else {
               resolve(results)
            }
         })
      })
   }

   async searchByName(name){
      const [firstName, lastName] = name.split(' ')
      const query = "SELECT * FROM users where name LIKE ? OR name LIKE ?"
      return await this.queryDatabase(query, [`%${firstName}%`, `%${lastName}%`])
   }

   async searchById(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE id =?"
      return await this.queryDatabase(query, [id])
   }

   async searchBySalaryRange(min,max){
      const query = "SELECT * FROM users WHERE salary BETWEEN ? AND ?"
      return await this.queryDatabase(query,[min,max])
   }

   async searchByAgeRange(min,max){
      const query = "SELECT * FROM users WHERE age BETWEEN ? AND ?"
      return await this.queryDatabase(query,[min,max])
   }

   async searchAfterUserId(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE sign_up_time > (SELECT sign_up_time FROM users WHERE id = ?)"
      return await this.queryDatabase(query,[id])
   }

   async searchAfterUserName(name){
      const query = "SELECT * FROM users WHERE sign_up_time > (SELECT sign_up_time FROM users WHERE name = ?)"
      return await this.queryDatabase(query,[name])
   }

   async searchNeverSignedIn(){
      const query = "SELECT * FROM users WHERE sign_in_time IS NULL"
      return await this.queryDatabase(query)
   }

   async searchSameDayAsUserId(id){
      id = parseInt(id, 10)
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = (SELECT DATE(sign_up_time) FROM users WHERE id =?)"
      return await this.queryDatabase(query,[id])
   }

   async searchSameDayAsUserName(name){
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = (SELECT DATE(sign_up_time) FROM users WHERE name =?)"
      return await this.queryDatabase(query,[name])
   }

   async searchByRegisteredToday(){
      const query = "SELECT * FROM users WHERE DATE(sign_up_time) = CURDATE()"
      return await this.queryDatabase(query)
   }

}

module.exports = DbService;
