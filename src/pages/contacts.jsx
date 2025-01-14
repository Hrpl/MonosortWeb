import React from "react";
import { Link } from "react-router-dom";

const Contacts = () => {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/contacts">Contacts</Link>
      <Link to="/about">About</Link>
      <h1>Contacts</h1>
    </>
  );
};

export default Contacts;
