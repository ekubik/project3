import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "../styles/Login.css"

import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
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
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);

    } catch (err) {
      console.error(err);
      alert("Please try again");
    }

    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <main className="flex-row mb-4 form-container container-fluid">
      <div className="col-5 col-lg-3 container ">
        <div className="card row justify-content-centre">
          <h4 className="card-header text-light">Login</h4>
          <div className="card-body ">
            {data ? (
              <p>
                Congratulations, you are now logged in.{" "}
                <Link to="/"> Click to return to the homepage</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="row">
                  <label htmlfor="email" className="col-4">
                    {" "}
                    Email{" "}
                  </label>
                  <input
                    className="form-input col-7 text-center"
                    placeholder="email@email.com"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="row">
                  <label htmlFor="password" className="col-4">
                    {" "}
                    Password{" "}
                  </label>
                  <input
                    className="form-input col-7 text-center"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="row justify-content-center">
                  <button
                    className="btn btn-block col-3 "
                    style={{ cursor: "pointer" }}
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
