import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignUp from "./pages/Signup";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Header />
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </ApolloProvider>
  );
}

export default App;
