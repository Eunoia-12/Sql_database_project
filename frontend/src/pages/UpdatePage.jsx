import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import '../Pages.css'

const Update = () => {
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const id = location.pathname.split("/")[2]

  useEffect(() => {
    // Fetch current user data to populate the form fields
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5050/user/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setShowPassword(response.default)
      } catch (error) {
        console.error("Error fetching user data: ", error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`http://localhost:5050/update/${id}`, {
        name, email, password
      });
      navigate("/signin")
      console.log("Update Success: ", response.data)
    } catch (error) {
      console.error("Update Error: ", error)
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            value={name}
            placeholder="Enter you name"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input 
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Enter your new password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Unsee' : 'See'}
          </button>
        </div>
        <button className="update-btn" type="submit">Update</button>
      </form>
    </div>
  )
}

export default Update;
