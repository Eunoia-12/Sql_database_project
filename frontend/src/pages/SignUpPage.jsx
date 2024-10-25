import React, { useState } from 'react'
import axios from 'axios'
import '../Pages.css'
import { Link, useNavigate} from 'react-router-dom'


const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [salary, setSalary] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate('')
  const handleSignUp = async(e) => {
    e.preventDefault()
    try{
      const response = await axios.post('http://localhost:5050/signup',{
        name,email,age,salary,password
      })
      console.log('Signup Sucess: ', response.data)
      setName('')
      setEmail('')
      setAge('')
      setSalary('')
      setPassword('')
      setShowPassword(false)
      navigate("/signin")
    }catch(error){
      console.error('Signup Error: ', error)
    }
  };

  return (
    <div className="container">
      <h2>Signup Page</h2>
        <form onSubmit={handleSignUp}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="Your Name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Your Email here"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="age"
              type="age"
              value={age}
              placeholder="Your Age here"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              id="salary"
              type="number"
              value={salary}
              placeholder="Your Annual Salary here"
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="Your PassWord here"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
            type="button"
            onClick={ (e) => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Unsee' : 'See'}
            </button>
          </div>
          <button className="page-btn" type="submit">Sign Up</button>
          <Link className="link" to="/signin">Already have an account?</Link>
        </form>
    </div>
  );
};

export default SignUp;
