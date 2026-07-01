import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Lightfall from "../../components/Lightfall/Lightfall";

function Login() {

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
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/");
  } catch (error) {
    console.error(error);
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
          colors={['#0b57d0', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd']}
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

      <div className="w-full max-w-md rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl p-8">

        <h1 className="text-4xl font-bold text-center text-[#0b57d0]">
          ORA
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Welcome Back
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">


          <div>
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-[#0b57d0] text-blue-600"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>


          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <div className="flex items-center border rounded-lg px-4 focus-within:border-[#0b57d0]">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full py-3 outline-none  text-blue-600 focus:border-[#0b57d0]"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="text-[#0b57d0] font-medium"
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
            className="w-full rounded-lg bg-[#0b57d0] py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <button onClick={handleGoogleLogin} className="w-full rounded-lg bg-[#0b57d0] py-3 text-white font-semibold hover:bg-blue-700 transition">
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;