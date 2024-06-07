import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';


const Register = () => {

    const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', { name, email, password });
      const { token } = response.data;

      // Store the token in localStorage
      localStorage.setItem('token', token);
      navigate("/")
      // Handle successful registration
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <div className="flex absolute top-0 left-0 w-[100vw] h-[100vh] flex-col items-center justify-center bg-[#ded3e8] z-[10000]">
        <h1 className="text-5xl font-bold mb-6 text-[#5c218b]">digital<span className='font-thin'>flake</span></h1>
        <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            style={{ height: "auto", minHeight: "400px" }}
        >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-4 mb-6 border text-2xl text-[#662671] bg-purple-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c218b] focus:border-transparent"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-4 mb-6 border text-2xl text-[#662671] bg-purple-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c218b] focus:border-transparent"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-4 mb-8 border text-2xl text-[#662671] bg-purple-100 border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5c218b] focus:border-transparent"
            />
            <button
                type="submit"
                className="w-full p-4 bg-[#5c218b] text-white rounded-md hover:bg-[#4a186e] focus:outline-none focus:ring-2 focus:ring-[#5c218b] focus:ring-opacity-50"
            >
                Register
            </button>
            <Link className='ml-[160px]' to="/login">
                <span className='text-[#662671] hover:text-gray-800'>Already have an account?</span>
            </Link>
        </form>
    </div>
);
}

export default Register