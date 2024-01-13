import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/AuthContext/AuthContext";

const Register = () => {
  const { registerUserAction, error } = useContext(authContext);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !fullname) {
      return alert("Please provide all details");
    }

    try {
      await registerUserAction(formData);
      // Handle successful registration, redirect, show a success message, etc.
    } catch (error) {
      console.error("Registration failed:", error.message);
      // Handle registration error, display an error message, etc.
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-md bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Create an Account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullname"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={fullname}
            onChange={handleChange}
            className="mt-1 p-3 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
            placeholder="Your Full Name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="mt-1 p-3 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="mt-1 p-3 w-full border-b-2 border-gray-300 focus:outline-none focus:border-green-500"
            placeholder="********"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-green-500 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;
