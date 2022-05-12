import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { NEW_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const SignUp = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [newUser, { error, data }] = useMutation(NEW_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await newUser({
        variables: { ...formState },
      });

      Auth.login(data.newUser.token);

    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again")
    }
  };

  return (
    <div className="container">
      <h1> SIGN UP </h1>

      <h2>
        Already have an account? <Link to="/login">Click here to log in</Link>
      </h2>
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="First Name"
            name="firstName"
            type="text"
            value={formState.firstName}
            onChange={handleInputChange}
          ></input>
          <input
            className="form-input"
            placeholder="Last Name"
            name="lastName"
            type="text"
            value={formState.lastName}
            onChange={handleInputChange}
          ></input>
          <input
            className="form-input"
            placeholder="Username"
            name="username"
            type="text"
            value={formState.username}
            onChange={handleInputChange}
          ></input>
          <input
            className="form-input"
            placeholder="Email"
            name="email"
            type="text"
            value={formState.email}
            onChange={handleInputChange}
          ></input>
          <input
            className="form-input"
            placeholder="*******"
            name="password"
            type="password"
            value={formState.password}
            onChange={handleInputChange}
          ></input>
          <button> Submit </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;