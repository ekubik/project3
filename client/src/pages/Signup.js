import React, { useState } from "react";
import { Link } from "react-router-dom";
import {Card, Button} from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { NEW_USER } from "../utils/mutations";

import Auth from "../utils/auth";
import "../styles/SignUp.css"

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
    }
  };

  return (
    <div className="container">
      <div className="flex-row justify-center">
        <Card className="text-center">
          <div>
            <Card.Header>
              <h1> SIGN UP </h1>
            </Card.Header>
          </div>
          <div className="card-body">
            <h2>
              Already have an account?{" "}
              <Link className="redirectLink" to="/login">
                Click here to log in
              </Link>
            </h2>
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link className="redirectLink" to="/">
                  back to the homepage.
                </Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row justify-content-center">
                  <label className="col-3" htmlFor="firstName">
                    {" "}
                    First Name{" "}
                  </label>
                  <input
                    autoComplete="on"
                    className="form-input col-3"
                    placeholder="First Name"
                    name="firstName"
                    type="text"
                    value={formState.firstName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <label className="col-3" htmlFor="lastName">
                    {" "}
                    Last Name{" "}
                  </label>
                  <input
                    className="form-input col-3"
                    placeholder="Last Name"
                    name="lastName"
                    type="text"
                    value={formState.lastName}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <label className="col-3" htmlFor="username">
                    {" "}
                    Username:{" "}
                  </label>
                  <input
                    className="form-input col-3"
                    placeholder="Username"
                    autoComplete="username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <label className="col-3" htmlFor="email">
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    className="form-input col-3"
                    placeholder="Email"
                    autoComplete="email"
                    name="email"
                    type="text"
                    value={formState.email}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <div className="row justify-content-center">
                  <label className="col-3" htmlFor="password">
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    className="form-input col-3"
                    placeholder="*******"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={formState.password}
                    onChange={handleInputChange}
                  ></input>
                </div>
                <button className="submitButton"> Submit </button>
              </form>
            )}
          </div>
        </Card>
        {error && (
          <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
