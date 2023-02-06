import React from "react";
import styleConfirmation from "./Confirmation.module.css";

//component to ask for confirmation to delete the product
const Confirmation = ({ config }) => {
  return (
    <div className={styleConfirmation.container}>
      Are you sure you want to delete this product?
      <div className={styleConfirmation["btn-container"]}>
        <button
          className={styleConfirmation.btn}
          style={{ background: "#f63939" }}
          onClick={() => config.onConfirm(config.id)}
        >
          Delete
        </button>
        <button
          className={styleConfirmation.btn}
          style={{ color: "black" }}
          onClick={() => config.close()}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
