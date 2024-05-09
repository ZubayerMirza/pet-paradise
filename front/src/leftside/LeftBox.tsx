import React, { useEffect, useState } from "react";
import "./leftbox.css";
import LeftPanel from "../components/LeftPanel";

function LeftBox() {
  const onclickHandler = () => {
    return;
  };

  return (
    <>
      <div className="leftBox" onClick={onclickHandler}>
        social media side bar here
        <LeftPanel />
      </div>
    </>
  );
}
export default LeftBox;
