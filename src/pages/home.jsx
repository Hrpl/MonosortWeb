import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/about">About</Link>
      <h1>Home</h1>
    </>
  );
};

export default Home;
