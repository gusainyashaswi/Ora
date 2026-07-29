import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Lightfall from "../../components/Lightfall/Lightfall";

function Login() {

  const LIGHTFALL_COLORS = [
  "#0b57d0",
  "#2563eb",
  "#3b82f6",
  "#60a5fa",
  "#93c5fd",
];

  const navigate = useNavigate();
  const { login } = useAuth();
  const googleProvider = new GoogleAuthProvider();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("")

  async function handleGoogleLogin() {
  try {
    await signInWithPopup(auth, googleProvider);
    navigate("/");
  } catch (error) {
    console.log("Error Code:", error.code);
    console.log("Error Message:", error.message);
    console.log(error);
  }
}

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    }
    else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    try {
      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      login();

      setLoginError("");

      setForm({
        email: "",
        password: "",
      });

      navigate("/");
    } catch (error) {
      console.error(error);

      setLoginError("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="fixed inset-0 -z-10 bg-[#ebebeb]">
        <Lightfall
          colors={LIGHTFALL_COLORS}
          speed={0.4}
          streakCount={40}
          streakWidth={1.5}
          streakLength={1.2}
          glow={1}
          density={0.4}
          twinkle={1.0}
          zoom={2.5}
          backgroundGlow={0}
          opacity={0.8}
          mouseInteraction={true}
          mouseStrength={1.0}
          mouseRadius={0.8}
        />
      </div>

      <div className="w-full max-w-md rounded-2xl bg-transparent backdrop-blur-xs border border-none shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center tracking-[0.35em] text-black">
          ORA
        </h1>

        <p className="text-center text-gray-600 mt-2 mb-8">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">


          <div>
            <label className="block mb-2 font-medium text-black">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border-b px-4 py-3 outline-none focus:border-b-3 hover:border-b-2 transition text-black"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>


          <div>
            <label className="block mb-2 font-medium text-black">
              Password
            </label>

            <div className="flex items-center border-b px-4 focus-within:border-b-3 hover:border-b-2 transition-all">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-3 outline-none  text-black"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-black font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </button>

            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          {loginError && (<p className="text-red-500 text-center">{loginError}</p>)}

          <button
            type="submit"
            className="w-full rounded-lg bg-black py-3 text-white font-semibold hover:bg-gray-600 hover:text-white transition"
          >
            Login
          </button>

          <button type="button" onClick={handleGoogleLogin} className="w-full rounded-lg bg-black py-3 text-white font-semibold hover:bg-gray-600 hover:text-white transition">
            Continue with Google
          </button>

          <div className="items-center flex flex-col">
            <h3 className="font-bold">Demo Credentials</h3>
            <div className="flex flex-col justify-center items-center">
            <p>Email: demo@ora.com</p>
            <p>Password: demo123</p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}

export default Login;