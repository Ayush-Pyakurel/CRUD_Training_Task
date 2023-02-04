import React from "react";
import { createPortal } from "react-dom";
import styleModal from "./Popup.module.css";

const Popup = ({ config }) => {
  return createPortal(
    <div className={styleModal.container}>
      <div className={styleModal.card}>
        <div className={styleModal.head}>
          <div className={styleModal.title}>{config.title}</div>
          <div className={styleModal.close} onClick={() => config.close()}>
            {" "}
            X{" "}
          </div>
        </div>
        {config.component}
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Popup;
