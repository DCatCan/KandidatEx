import Image from "next/image";
import { useEffect, useState } from "react";
import nodeImg from "./../public/ellipse_outline.svg";
import LS from "./../styles/Layout.module.scss";
import GS from "./../styles/Genome.module.scss";
import { setConfig } from "next/config";

function Genome({ Gene, focusGene, id, index, func }) {
  function checkClass() {
    let bl =
      Gene[9] === true
        ? Gene[0] === focusGene
          ? `${LS["gene"]} ${LS["focused"]}`
          : `${LS["gene"]} ${LS["common"]}`
        : `${LS["gene"]}`;
    return bl;
  }

  return (
    <button
      className={checkClass()}
      id={id}
      onClick={async () => {
        await func([index, Gene].flat(), true);
      }}
    >
      <p>{Gene[0]}</p>
    </button>
  );
}

export default Genome;
