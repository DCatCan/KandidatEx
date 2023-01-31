import { createRef, useRef, useState } from "react";
import { Filter } from "../components/Filter";
import { Inputs } from "../components/Inputs";
import LS from "../styles/Layout.module.scss";
import { useEffect } from "react";
import { Browser } from "../components/Browser";
import { Species } from "../components/Species";

export default function Home() {
  //data input

  const [pillarO, setpillarO] = useState([]);
  const [pillarS, setPillarS] = useState([]);
  const [arter, setArter] = useState([]);
  const refArray = useRef([]);

  const [info, setInfo] = useState();
  const infoLabels = [
    "Position",
    "NAME",
    "ORIENTATION",
    "START COORDINATE",
    "STOP COORDINATE",
    "ON/OFF",
    "CHROMOSOME/CONTIG/SCAFFOLD NUMBER",
    "SHORT NAME",
    "COORDINATES",
    "NOTES",
  ];
  //browser output

  const [out, setOut] = useState([]);

  //filter input
  const [options, setOptions] = useState({
    amount: 10,
    shared: false,
    speciesRdy: [],
    speciesFocus: null,
    PI: null,
    PIA: null,
  });

  //functions
  function handleFileChange(e, pillarfunc) {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (e.target.name == "order") {
        const res = reader.result.split("\n").map((row) => {
          return row.split("\t");
        });
        const name = e.target.files[0].name.replace(/[.]\w+/, "");
        !options.speciesRdy.includes(name)
          ? (options.speciesRdy.push(name), pillarfunc([...pillarO, res]))
          : alert("Already in!");

        options.speciesRdy.length === 1
          ? (options.speciesFocus = options.speciesRdy[0])
          : null;
      } else {
        const res = reader.result.split("\n").map((row) => {
          return row.split("\t");
        });
        const spec = res.splice(0, 1).flat();
        setArter(spec);
        options.shared = true;
        const sharedGenomes = [];
        for (let i = 0; i < res[0].length; i++) {
          const temp = [];
          temp.push(
            res.map((elem) => {
              return elem[i];
            })
          );
          sharedGenomes.push(temp.flat());
        }
        setPillarS(null);
        setOptions((prev) => {
          return { ...prev, ["PI"]: 0 };
        });
        setPillarS(sharedGenomes);
      }
    };

    reader.readAsText(e.target.files[0]);
  }

  function getSharedPillarColumn(b) {
    //return genes from shared pillar
    let shared = pillarS.length > 0 ? true : false;
    let index = arter.indexOf(b);
    return pillarS[index].flat();
  }
  function setSharedGenes(nameOfSpecies) {
    // return a ordered list with the genes who are shared among the Shared Pillar
    let shared = getSharedPillarColumn(nameOfSpecies);
    let order = Array.from(pillarO[options.speciesRdy.indexOf(nameOfSpecies)]);
    let geneList = order.map((elem) => elem[0]);
    for (let i = 0; i < shared.length; i++) {
      let elem = shared[i];
      let index = geneList.indexOf(elem);
      if (index !== -1) {
        order[index].push(true);
      }
    }
    return order;
  }
  function getRefs() {
    return refArray;
  }

  function getSPillarRow(index) {
    //Get a row at given index where all the species share the same gene. OBS NOT THE SAME ORDER IN SHARED PILLAR
    let row = [];

    let temp = options.speciesRdy.map((elem) => arter.indexOf(elem));
    temp.forEach((i) => {
      row.push(pillarS[i][index]);
    });

    return row;
  }

  //Changing filter input
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "PI") {
      setOptions((prev) => {
        return { ...prev, ["PIA"]: getSPillarRow(value) };
      });
    }
    setOptions((prev) => {
      return { ...prev, [name]: value };
    });
  };
  //apply filter to every species component
  async function setFilters(information, boolVar) {
    if (boolVar) {
      setInfo(
        <div className={`${LS["GenInfo"]}`}>
          {information.map((elem, i) => {
            if (i === information.length - 1) {
              return;
            }
            return (
              <p>
                {infoLabels[i]} = {elem}
              </p>
            );
          })}
          <button
            onClick={() => {
              setInfo();
            }}
          >
            Close
          </button>
        </div>
      );
    } else {
      setInfo();
    }
  }
  //when ordered pillar is added -- SHARED PILLAR

  useEffect(() => {
    //if no order pillars available, show the different species and what they share.
    //apply filter then out
    let update = pillarO.length > out.length ? true : false;
    let shared = pillarS.length > 0 ? true : false;

    if (update && shared) {
      for (let i = out.length; i < options.speciesRdy.length; i++) {
        const element = setSharedGenes(options.speciesRdy[i]);
        setOptions((prev) => {
          return { ...prev, ["PIA"]: getSPillarRow(options.PI) };
        });
        setOut((elem) => [...elem, element]);
      }
    }
  }, [pillarS]);

  //when ordered pillar is added -- ORDER PILLAR
  useEffect(() => {
    //if no shared pillars, show all the species genes that the pillar
    let update = pillarO.length > out.length ? true : false;
    let shared = pillarS.length > 0 ? true : false;
    function scrollHandler(ref) {
      ref.current.scrollLeft =
        (ref.current.scrollWidth - ref.current.clientWidth) / 2;
    }

    if (update && shared) {
      for (let i = out.length; i < options.speciesRdy.length; i++) {
        const element = setSharedGenes(options.speciesRdy[i]);
        element[element.length - 1].length < 9 ? element.pop() : null;
        setOptions((prev) => {
          return { ...prev, ["PIA"]: getSPillarRow(options.PI) };
        });

        setOut((elem) => [...elem, element]);
      }
    }
    console.log(scrollX);
  }, [pillarO]);

  //Filter
  useEffect(() => {
    console.log(options);
  }, [options]);

  return (
    <div className="">
      <Inputs
        inputFunctions={[setpillarO, setPillarS]}
        handleChange={handleFileChange}
      />

      {/* browser display */}
      {info}
      <Browser
        information={out}
        fRefs={getRefs}
        focusGenes={options.PIA}
        amount={options.amount}
        func={setFilters}
      />
      <Filter
        getGenes={getSharedPillarColumn}
        handleChange={handleChange}
        options={options}
      />
    </div>
  );
}

