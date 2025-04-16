import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../../assets/picture/water.png";

const SignUp = () => {
  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);
  const [eAccount, setEAccount] = useState(false);
  const [eEmail, setEEmail] = useState(false);
  const [ePhone, setEPhone] = useState(false);
  const [fill, setFill] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      date: birth,
      address,
      email,
      phone,
      account: username,
      password,
    };

    if (
      !name ||
      !birth ||
      !address ||
      !email ||
      !phone ||
      !username ||
      !password
    ) {
      setFill(true);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate("/login-as");
    }, 2000);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="hidden md:flex md:w-2/5 bg-gradient-to-br from-[#2AF598] to-[#08AEEA] relative">
        <div className="flex flex-col justify-center items-start px-12 w-full">
          <div className="mb-12">
            <div className="flex font-sans font-bold text-4xl">
              <p className="text-[#ffe713]">Smart</p>
              <p className="text-white">Water</p>
            </div>
          </div>

          <h1 className="text-5xl font-bold text-white mb-8">
            Tạo tài khoản mới
          </h1>
          <p className="text-white text-xl max-w-md">
            Chào mừng bạn đến với hệ thống tưới thông minh. Hoàn thành thông tin
            đăng ký để trải nghiệm dịch vụ của chúng tôi.
          </p>

          <div className="mt-16 bg-white/20 backdrop-blur-sm p-6 rounded-xl border border-white/30">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold text-lg">
                  Quá trình đơn giản
                </h3>
                <p className="text-white/80">Đăng ký chỉ trong vài phút</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-white font-semibold text-lg">
                  Bảo mật tối đa
                </h3>
                <p className="text-white/80">
                  Thông tin của bạn luôn được bảo vệ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-3/5 bg-white flex items-center justify-center px-4 md:px-12 py-8">
        <div className="w-full max-w-xl p-8 md:p-12">
          <div className="md:hidden flex justify-center mb-8">
            <div className="text-center">
              <img
                src={avatar}
                className="w-20 h-20 mb-2 rounded-full shadow-md mx-auto"
                alt="logo"
              />
              <div className="flex font-sans font-bold text-2xl justify-center">
                <p className="text-[#2AF598]">Smart</p>
                <p className="text-[#08AEEA]">Water</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#52ACFF]">
              Đăng ký
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Họ và tên
                </label>
                <div
                  className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
                >
                  <input
                    type="text"
                    className="w-full bg-[#F5F5F5] outline-none"
                    placeholder="Nguyễn Văn A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Ngày sinh
                </label>
                <div
                  className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
                >
                  <input
                    type="date"
                    className="w-full bg-[#F5F5F5] outline-none"
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Địa chỉ
              </label>
              <div
                className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
              >
                <input
                  type="text"
                  className="w-full bg-[#F5F5F5] outline-none"
                  placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Email
                </label>
                <div
                  className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
                >
                  <input
                    type="email"
                    className="w-full bg-[#F5F5F5] outline-none"
                    placeholder="example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {eEmail && (
                  <p className="text-red-500 text-xs mt-1">Email đã tồn tại</p>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Số điện thoại
                </label>
                <div
                  className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
                >
                  <input
                    type="tel"
                    className="w-full bg-[#F5F5F5] outline-none"
                    placeholder="0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                {ePhone && (
                  <p className="text-red-500 text-xs mt-1">
                    Số điện thoại đã tồn tại
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Tên đăng nhập
              </label>
              <div
                className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
              >
                <input
                  type="text"
                  className="w-full bg-[#F5F5F5] outline-none"
                  placeholder="Tên đăng nhập của bạn"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              {eAccount && (
                <p className="text-red-500 text-xs mt-1">
                  Tên đăng nhập đã tồn tại
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Mật khẩu
              </label>
              <div
                className="w-full px-4 py-3 bg-[#F5F5F5] text-sm rounded-xl border border-transparent 
               focus:outline-none focus:ring-2 focus:ring-[#0D986A] focus:bg-white 
               transition-all duration-200 placeholder-gray-400"
              >
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-[#F5F5F5] outline-none"
                  placeholder="Mật khẩu của bạn"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                ></div>
              </div>
            </div>

            {fill && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">Vui lòng điền đầy đủ thông tin</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <p className="text-green-700 font-medium">
                  Đăng ký thành công! Đang chuyển hướng...
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#0D986A] text-white py-3 px-6 rounded-2xl font-medium 
                shadow-[0px_8px_28px_0px_rgba(79,117,105,0.5)] hover:bg-[#0B8459] transition-all duration-300 
                flex-1 sm:flex-initial sm:min-w-[180px]"
              >
                Gửi yêu cầu
              </button>

              <button
                type="button"
                className="border-2 border-[#df4d13d2] text-[#df4d13d2] py-3 px-6 rounded-2xl font-medium
                hover:bg-green-50 transition-all duration-300
                flex-1 sm:flex-initial sm:min-w-[180px]"
                onClick={() => navigate("/login-as")}
              >
                Hủy
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Đã có tài khoản?{" "}
              <Link
                to="/login-as"
                className="text-[#0D986A] font-medium hover:underline"
              >
                Đăng nhập ngay
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
