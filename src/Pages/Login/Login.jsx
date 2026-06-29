import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("")

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
      newErrors.password = "Password is required";} 
      else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";}
    return newErrors;}

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-6">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8">

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

        </form>
      </div>
    </div>
  );
}

export default Login;