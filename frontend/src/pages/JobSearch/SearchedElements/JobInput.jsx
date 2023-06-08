import React, { useState, useContext } from "react";
import SearchJobContext from "../../../contexts/SearchJobContext/SearchJobContext";

function JobInput() {
  const { searchJob, setSearchJob } = useContext(SearchJobContext);

  const [classSelect, setClassSelect] = useState("notselected");

  const handleSelect = (event) => {
    setClassSelect("selected");
    setSearchJob(event.target.value);
  };

  const jobList = [
    { value: "metier1", name: "Developpeur Web" },
    { value: "metier2", name: "Data Analyst" },
    { value: "metier3", name: "UX Designer" },
  ];

  return (
    <select className={classSelect} onChange={handleSelect} value={searchJob}>
      <option className="notselected" value="">
        Selectionner un métier
      </option>
      {jobList.map((element) => {
        return (
          <option
            className="selected"
            value={element.value}
            key={element.value}
          >
            {element.name}
          </option>
        );
      })}
    </select>
  );
}

export default JobInput;
