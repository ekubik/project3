import React from "react";
import { useQuery } from "@apollo/client";
import "../styles/Home.css";

import RockList from "../components/RockList";

import { QUERY_ALL_ROCKS } from "../utils/queries";

const Home = () => {
  const { loading, data } = useQuery(QUERY_ALL_ROCKS);
  const rocks = data?.rocks || [];
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
        <RockList rocks={rocks} title="Look at all these Rocks" /> </div>
      )}
    </div>
  );
};

export default Home;
