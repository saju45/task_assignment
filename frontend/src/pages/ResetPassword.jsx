import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

   const [email, setEmail] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");

   const navigate=useNavigate();


     const handleSubmit =async (e) => {
          e.preventDefault();

          try {
              if (newPassword !== confirmPassword) {
                alert("Passwords do not match!");
                return;
              }

              const response = await axios.post("http://localhost:3000/api/users/resetPassword", {
                email,
                newPassword,
              }, {
                withCredentials: true,
              });

              if (response.status === 200) {
                toast.success(response.data?.message);
                navigate("/login");
              } else {
                toast.error("Password reset failed. Please try again.");
              }
          } catch (error) {
            console.error("Error password reset:", error);
            toast.error(error.response?.data?.error);
          }
     }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-900 to-black flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 md:p-12">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-green-100 p-3 rounded-full mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-.768.293-1.47.768-2m0 0A3.001 3.001 0 0115 9m-2.232 0A3.001 3.001 0 0012 6m0 0V4m0 2a3.001 3.001 0 00-3 3m0 0a3.001 3.001 0 003 3m0 0v2m0-2a3.001 3.001 0 003-3"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Reset your Password</h2>
          <p className="text-sm text-gray-500 text-center mt-1">
            Strong passwords include numbers, letters, and punctuation marks.
          </p>
        </div>

        <form className="space-y-4"  onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Enter New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-8 right-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Retype password"
              className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute top-8 right-3 text-gray-500"
            >
              {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
