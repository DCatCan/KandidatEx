import { useState } from "react";
import Image from "next/image";
import FS from "./../styles/FormStyle.module.scss";
import LS from "./../styles/Layout.module.scss";
import plusSign from "./../public/add_outline.svg";

export const Inputs = ({ handleChange, inputFunctions }) => {
  return (
    <div className={LS["container"]}>
      <form className={`${FS["form"]} `}>
        <div className={LS["flex-column"]}>
          <label htmlFor="order">Order Pillar</label>
          <input
            type="file"
            name="order"
            id="order"
            onChange={(e) => {
              handleChange(e, inputFunctions[0]);
            }}
          />
        </div>
        <div className={LS["flex-column"]}>
          <label htmlFor="order">Shared Pillar</label>
          <input
            type="file"
            name="shared"
            id="shared"
            onChange={(e) => {
              handleChange(e, inputFunctions[1]);
            }}
          />
        </div>
      </form>
    </div>
  );
};
