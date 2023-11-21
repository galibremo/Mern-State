import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [frontEndError, setfrontEndError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = {};
    if (!formData.username) {
      validationError.username = "username is required";
    } else if (formData.username.length < 4) {
      validationError.username = "username must have 4 char atleast";
    }
    if (!formData.email) {
      validationError.email = "Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
      validationError.email = "Email is not Valid";
    }
    if (!formData.password) {
      validationError.password = "Password is required";
    } else if (formData.password.length < 7) {
      validationError.password = "Password should be at least 8 char";
    } else if (!/(?=.*[a-z])/.test(formData.password)) {
      validationError.password =
        "Password must contain at least one lower case";
    } else if (!/(?=.*[A-Z])/.test(formData.password)) {
      validationError.password =
        "Password must contain at least one upper case";
    } else if (!/(?=.*[0-9])/.test(formData.password)) {
      validationError.password = "Password must contain at least one digit";
    }
    setfrontEndError(validationError);
    if (Object.keys(validationError).length === 0) {
      try {
        setLoading(true);
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success === false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setLoading(false);
        setError(null);
        navigate("/sign-in");
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleChange}
        />
        {frontEndError.username && <p className="text-red-500 my-1">{frontEndError.username}</p>}
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        {frontEndError.email && <p className="text-red-500 my-1">{frontEndError.email}</p>}
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        {frontEndError.password && <p className="text-red-500 my-1">{frontEndError.password}</p>}

        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex mt-5 gap-2">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  );
}
