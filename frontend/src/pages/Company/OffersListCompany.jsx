import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HeaderBasic from "../../components/Header/HeaderBasic";
import JobCard from "../../components/Elements/JobCard";
import BlackButton from "../../components/Elements/BlackButton";

function OffersListCompany() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    const id = 4;
    const url = `http://localhost:8080/api/offerDetailss/${id}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.info("Response:", data);
        setResult(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div className="OffersListCompany">
      <HeaderBasic />
      <div className="boxWithoutHeader">
        <div className="OffersListTitle">
          <h1>Offres</h1>
        </div>

        <div className="offer">
          {result.map((offer) => (
            <NavLink to="/company/application" key={offer.id}>
              <JobCard
                logo={offer.logo}
                companyName={offer.company_name}
                job={offer.job}
                contractType={offer.contract_type}
                jobCity={offer.city_job}
                date={offer.date}
              />
            </NavLink>
          ))}
        </div>
        <div className="returnButton">
          <NavLink to="/company/dashboard">
            <BlackButton buttonName="Retour à mon espace" />
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default OffersListCompany;
