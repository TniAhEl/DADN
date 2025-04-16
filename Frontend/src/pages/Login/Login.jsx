import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import avatar from "../../assets/picture/water.png";

const Login = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="hidden md:flex w-2/5 bg-white flex-col justify-center  px-16 items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <img src={avatar} alt="logo" className="w-20 " />
          <div className="text-3xl font-bold flex items-center gap-1">
            <span className="text-[#2AF598]">Smart</span>
            <span className="text-[#08AEEA]">Water</span>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between">
          <h1 className="text-5xl font-bold text-[#2AF598] leading-tight ">
            Chào Mừng!
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-md">
            Đăng nhập để truy cập tài khoản của bạn và khám phá các tính năng
            mới nhất của chúng tôi.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gradient-to-br from-[#2AF598] to-[#08AEEA] flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-2xl px-8 md:px-16 py-10 w-[90%] max-w-md border border-black">
          <div className="mb-6 text-center">
            <h2 className="text-4xl font-bold text-[#52ACFF]">Đăng nhập</h2>
            <p className="text-lg text-gray-600 mt-2">
              {params.userType === "admin" ? "Quản trị viên" : "Quản trị viên"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm text-gray-600">Tên đăng nhập</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tên đăng nhập của bạn"
                className="w-full mt-1 px-4 py-3 rounded-md bg-gray-100 border-b-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
            </div>

            <div className="relative">
              <label className="text-sm text-gray-600">Mật khẩu</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu của bạn"
                className="w-full mt-1 px-4 py-3 rounded-md bg-gray-100 border-b-2 border-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                required
              />
              <div
                className="absolute right-4 top-11 cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEye size={22} />
                ) : (
                  <AiFillEyeInvisible size={22} />
                )}
              </div>
            </div>

            {warning && (
              <div className="text-red-500 text-sm -mt-2">
                Sai tên đăng nhập hoặc mật khẩu
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-[#0D986A] hover:bg-[#0B8459] text-white rounded-full font-semibold text-lg shadow-lg transition-all duration-300"
            >
              Đăng nhập
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            <span className="mr-1">Chưa có tài khoản?</span>
            <Link
              to="/register"
              className="text-green-700 hover:underline font-medium"
            >
              Yêu cầu đăng ký tài khoản!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
