
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../assets/images/login.jpg";
const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
    
   
   const handleLogin = async (e) => {
              e.preventDefault();
        
              try {
                  const response = await axios.post("http://localhost:3000/api/users/login", {
                      email,
                      password,
                  }, {
                      withCredentials: true,
                  });

                  console.log("Login response:", response.data);
                  

                  if (response.status === 200) {
                      toast.success(response.data.message || "Login successful!");
                      localStorage.setItem("token", response.data.token);
                      navigate("/");
                  } else {
                      alert("Login failed. Please try again.");
                      console.error("Login failed:", response.data);
                  }
              } catch (error) {
                  console.error("Error during login:", error);
                  toast.error(error.response?.data?.message || "An error occurred during login.");
              }
      }


  return (
    <div className="min-h-screen flex items-center justify-center  ">
        
        <div className="hidden md:flex w-1/2 h-screen bg-gradient-to-br from-gray-900 to-green-900 items-center justify-center p-10">
          <img
            src={loginImage}
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-1">Login</h2>
          <p className="text-sm text-gray-500 mb-6">
            Welcome back! Please login to your account.
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="mail@example.com"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <Link to={"/resetPassword"} className="text-green-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link to={"/signup"}  className="text-green-600 hover:underline font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;
