import React, { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext";

const Login = () => {
  const { loginUserAction, userAuth } = useContext(authContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      // Display an error message if email or password is empty
      alert("Please enter both email and password.");
      return;
    }
    loginUserAction(formData);
  };

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container px-4 mx-auto max-w-md">
        <div className="text-center mb-6">
          <h3 className="mb-4 text-3xl font-bold">Sign in to your account</h3>
          {userAuth?.error && <p className="text-red-500">{userAuth?.error}</p>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-coolGray-800 font-medium"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className="input-field"
              placeholder="somilchandra@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-coolGray-800 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="input-field"
              placeholder="************"
            />
          </div>
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox" />
            </label>
          </div>
          <button type="submit" className="button-primary">
            Sign In
          </button>
          <p className="text-center">
            <span className="text-xs font-medium">
              Don’t have an account? <a href="#">Sign up</a>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
