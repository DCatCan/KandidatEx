import l from "./../styles/Layout.module.scss";
import Genome from "./Genome";
import React, { forwardRef, useState } from "react";

export const Species = forwardRef(
  ({ speciesData, id, focusGene, amount, func }, ref) => {
    function getSlice() {
      let index;
      if (focusGene !== "---") {
        for (let i = 0; i < speciesData.length; i++) {
          const front = speciesData[i][0];
          const back = speciesData[speciesData.length - i - 1][0];

          if (front === focusGene) {
            index = i;
            break;
          }
          if (back === focusGene) {
            index = speciesData.length - i - 1;
            break;
          }
        }
      } else {
        index = 0 + amount;
      }
      console.log(amount);
      console.log(index);
      let first = index - amount;
      console.log(first);
      let last = index + amount + 1;

      const out = [];
      for (let i = first; i < last; i++) {
        out.push(speciesData[i]);
      }

      return out.map((elem, i) => (
        <Genome
          Gene={elem}
          focusGene={focusGene}
          id={elem[0]}
          index={first + i}
          key={i}
          func={func}
        />
      ));
    }
    return (
      <div className={`${l["species"]}`} ref={ref} id={id}>
        {getSlice()}
      </div>
    );
  }
);
