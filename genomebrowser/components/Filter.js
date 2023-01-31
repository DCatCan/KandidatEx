import { useRef, useState } from "react";
import filter from "../styles/Filter.module.scss";

export const Filter = ({ options, getGenes, handleChange }) => {
  const hmmm = (e) => {
    console.log(options);
  };
  return (
    <div className={filter.container}>
      <input
        type="number"
        name="amount"
        id="amount"
        onChange={handleChange}
        value={options.amount}
        min={0}
      />

      <div className={filter.container_input}>
        <select
          name="speciesFocus"
          id="speciesFocus"
          onChange={(e) => handleChange(e)}
        >
          {options.speciesRdy.length > 0 ? (
            options.speciesRdy.map((elem, i) => {
              return (
                <option value={elem} key={i}>
                  {elem}
                </option>
              );
            })
          ) : (
            <option value={-1}>No Species Available</option>
          )}
        </select>
        <p>{" = >"}</p>
        <select name="PI" id="PI" onChange={(e) => handleChange(e)}>
          {options.shared && options.speciesFocus ? (
            getGenes(options.speciesFocus).map((elem, i) => {
              return (
                <option value={i} key={i}>
                  {elem}
                </option>
              );
            })
          ) : (
            <option value={-1}>No Genes Available</option>
          )}
        </select>
      </div>
    </div>
  );
};
