import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>Something went wrong.</p>
      <button onClick={() => navigate("/")}>Reload</button>
    </div>
  );
};

export default ErrorPage;
