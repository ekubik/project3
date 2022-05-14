import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { ADD_ROCK } from "../utils/mutations";
import { QUERY_ALL_ROCKS, QUERY_MY_PROFILE } from "../utils/queries";

import Auth from "../utils/auth"

const NewRockForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    dateCollected: "",
    user: Auth.getProfile().data.username
  });
  const [addRock, { error, data }] = useMutation(ADD_ROCK);

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
      setFormState("");

      //Auth.login(data.newUser.token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2> Add a new rock to your collection </h2>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name"> Enter a name for your rock</label>
            <input
              autoComplete="on"
              className="form-input"
              placeholder="Name"
              name="name"
              type="text"
              value={formState.name}
              onChange={handleInputChange}
            ></input>
            <input
              className="form-input"
              placeholder="Description"
              name="description"
              type="text"
              value={formState.description}
              onChange={handleInputChange}
            ></input>
            <input
              className="form-input"
              placeholder="DD/MM/YYYY"
              autoComplete="off"
              name="dateCollected"
              type="text"
              value={formState.dateCollected}
              onChange={handleInputChange}
            ></input>
            <button> Submit </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              There's been a problem with your request. Please try again.
            </div>
          )}
        </form>
      ) : (
        <p>Log in to add a rock</p>
      )}
    </div>
  );
};

export default NewRockForm;
