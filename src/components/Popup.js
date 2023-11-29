import React, { useState } from "react";
import "./components.css";
// You can define your styles in Popup.css
import loadingGIF from "./assets/Bean Eater-1s-200px.gif";
import successPNG from "./assets/checked.png";
import failPNG from "./assets/cancel.png";

const Popup = ({ handleClose, show, state }) => {
  let content;
  let style = { width: "200px", height: "200px" };
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  if (state.Loading == true) {
    content = (
      <div className="content">
        <img src={loadingGIF} alt="Loading GIF" style={style} />
        <text>Loading...</text>
      </div>
    );
  } else {
    if (state.isError == true) {
      content = (
        <div className="content">
          <img src={failPNG} alt="Fail PNG" style={style} />
          <text>Transaction failed. Please try again. </text>
        </div>
      );
    } else {
      content = (
        <div className="content">
          <img src={successPNG} alt="Success PNG" style={style} />
          <text>Transaction success! </text>
        </div>
      );
    }
  }
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="content">
          {content}
          <button className="close-button" onClick={handleClose}>
            Close
          </button>
        </div>
      </section>
    </div>
  );
};
export default Popup;
