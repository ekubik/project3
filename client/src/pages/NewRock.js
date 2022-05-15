import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import "../styles/SignUp.css"

import { ADD_ROCK } from "../utils/mutations";

import Auth from "../utils/auth"

const NewRockForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    dateCollected: "",
    user: Auth.getProfile().data.username
  });
  const [addRock, { data, error }] = useMutation(ADD_ROCK);

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
    console.log(Auth.getProfile().data.username);

    try {
      const { data } = await addRock({
        variables: { ...formState, user: Auth.getProfile().data.username },
      });
      console.log(formState)
      setFormState(" ");


      //Auth.login(data.newUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container-fluid">
      <h2 id="newRock"> Add a new rock to your collection </h2>
      {Auth.loggedIn() ? (
        <div className="container justify-content-center">
        <form onSubmit={handleFormSubmit}>
          <div>
            <div className="row">
            <label className="col-10" htmlFor="name"> Enter a name for your rock</label>
            <input
              autoComplete="on"
              className="col-10 form-input"
              placeholder="Name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleInputChange}
            ></input>
            </div>
            <div className="row">
            <label className= "col-10" htmlFor="description"> Add a description. Features, interesting notes, anything you want! </label>
            <textarea
              className="form-input col-10"
              placeholder="Description"
              name="description"
              type="text"
              value={formState.description}
              onChange={handleInputChange}
            ></textarea>
            </div>
            <div className ="row">
            <label className="col-10" htmlFor="dateCollected">
              {" "}
              When did you add this rock to your collection ?
            </label>
            <input
              className="form-input col-10"
              placeholder="DD/MM/YYYY"
              autoComplete="off"
              name="dateCollected"
              type="text"
              value={formState.dateCollected}
              onChange={handleInputChange}
            ></input>
            </div>
            <div className="row justify-content-center">
            <button id ="submitNew" className="btn submitButton col-1"> Submit </button>
            </div>
          </div>
          {data && (
            <div className="my-3 col-8 text-white p-3">
              <strong>Your rock has been added to the database. </strong> Click
              <a href="/myprofile">here</a> to return to your profile.
            </div>
          )}
          ;
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              There's been a problem with your request. Please try again.
            </div>
          )}
        </form>
        </div>
      ) : (
        <p>Log in to add a rock</p>
      )}
    </div>
  );
};

export default NewRockForm;
