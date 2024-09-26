import React from "react";

const Wrapper = ({ children }) => {
  return <div className="w-full max-h-screen h-screen overflow-auto @container">{children}</div>;
};

export default Wrapper;
