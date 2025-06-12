"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FiUser, FiMail, FiLock, FiEyeOff, FiEye } from "react-icons/fi";
import { signUp } from "@/actions/auth";
import Link from "next/link";

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Registrasi = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);

    const result = await signUp(data);

    if (result.status === "success") {
      router.push(`/login`);
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  return (
    <div className="bg-dark  font-custom min-h-screen flex items-center justify-center">
      <div className="w-full relative max-w-md bg-base rounded-xl shadow-md p-8">
        <div className="flex  flex-col items-center pb-5 border-b-2 border-accent">
          {/* tombol ke home */}
          <Link
            href={"/"}
            className="absolute top-2 left-2 w-4 h-4 rounded-full cursor-pointer bg-accent hover:bg-accentt"
          ></Link>
          {/* <div className="w-20 border-2 h-20 rounded-full bg-white flex items-center justify-center">
            <FiUser className="text-3xl text-gray-400" />
          </div> */}
          <h2 className="text-2xl font-bold mt-4 font-stopsn">
            Registrasi akun chatour
          </h2>
          <p className="text-sm text-gray-500 mt-1">Masukan data anda</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username *
            </label>
            <div className="flex items-center bg-white focus-within:border-accentt border-transparent border-2 rounded px-3 py-2 mt-1">
              <FiUser className="text-gray-400 mr-2" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
                className="w-full outline-none"
                autoComplete="username"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <div className="flex bg-white items-center focus-within:border-accentt border-transparent border-2 rounded px-3 py-2 mt-1">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full outline-none"
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password *
            </label>
            <div className="flex bg-white items-center focus-within:border-accentt border-transparent border-2 rounded px-3 py-2 mt-1">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                className="w-full outline-none pr-8"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="ml-2 text-gray-500 focus:outline-none"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <p className="mt-2 italic font-custom text-sm">
            Silahkan{" "}
            <Link className="hover:underline" href={"/login"}>
              login
            </Link>
            , jika sudah punya akun
          </p>
          <br />
          <br />

          <button
            disabled={loading}
            type="submit"
            className={`${
              loading ? "bg-gray-600" : "bg-accent hover:bg-accentt"
            } w-full  text-dark py-2  rounded-md  transition font-semibold`}
          >
            {loading ? "Loading..." : "Register"}
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Registrasi;
