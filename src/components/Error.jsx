import React from "react";

const Error = ({ setError, err }) => {
  return (
    <div>
      <h3>{err}</h3>
      <button
        onClick={() => {
          setError(null);
        }}
      >
        Go Back
      </button>
    </div>
  );
};

export default Error;
