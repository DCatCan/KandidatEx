import { useRef, useState } from "react";
import LS from "../styles/Layout.module.scss";
import { Species } from "./Species";

export const Browser = ({ information, fRefs, focusGenes, amount, func }) => {
  const refArray = fRefs();

  return (
    <div className={`${LS["container__sm"]} ${LS["browser"]}`}>
      {information.map((elem, i) => {
        return (
          <Species
            key={i}
            ref={(ref) =>
              refArray.current[i] === ref ? ref : (refArray.current[i] = ref)
            }
            speciesData={elem}
            focusGene={focusGenes[i]}
            amount={parseInt(amount)}
            func={func}
          />
        );
      })}
    </div>
  );
};
