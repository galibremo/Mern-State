import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user); //const [error, setError] = useState(null);const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordButton, setShowPasswordButton] = useState(false);
  const [changeShowPasswordIcon, setChangeShowPasswordIcon] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleChange(event) {
    console.log(event.target);
    const { id, value } = event.target;
    if (id === "password") {
      if (value) {
        setShowPasswordButton(true);
      } else {
        setShowPasswordButton(false);
      }
    }
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      dispatch(signInStart()); //setLoading(true);
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message)); //setLoading(false); setError(data.message);
        return;
      }
      dispatch(signInSuccess(data)); //setLoading(false);setError(null);
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message)); //setLoading(false);setError(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <div className="flex relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="password"
            className="border p-3 rounded-lg w-full"
            id="password"
            onChange={handleChange}
          />
          {showPasswordButton && (
            <button
              onClick={() => {
                setShowPassword((ShowPassword) => !ShowPassword);
                setChangeShowPasswordIcon((p)=>!p);
              }}
              id="show-password-button"
              type="button"
            >
              {changeShowPasswordIcon ? (
                <FaEye className="absolute inset-y-4 right-4 text-slate-700" />
              ) : (
                <FaEyeSlash className="absolute inset-y-4 right-4 text-slate-700" />
              )}
            </button>
          )}
        </div>
        <Link to={"/forgetpassword"}>
          <span className="text-blue-700 hover:underline">Forget Password</span>
        </Link>
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-5 gap-2">
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
