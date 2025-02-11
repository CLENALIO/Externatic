import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeaderBasic from "../../components/Header/HeaderBasic";
import InputListe from "../../components/Elements/InputListe";
import Textearea from "../../components/Elements/Textearea";
import BlackButton from "../../components/Elements/BlackButton";
import InputTexte from "../../components/Elements/InputTexte";
import Popup from "../../components/Elements/Popup";
import CompanyConnexionContext from "../../contexts/CompanyConnexionContext/CompanyConnexionContext";

function OfferCreation() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const [showPopup1, setShowPopup1] = useState(false);
  const { companyId } = useContext(CompanyConnexionContext);
  const [offerData, setOfferData] = useState([]);

  const handlePopup1Open = () => {
    setShowPopup1(true);
  };

  const handlePopup1Close = () => {
    setShowPopup1(false);
    navigate("/company/dashboard");
  };

  const [formData, setFormData] = useState({
    company_id: companyId,
    job: "",
    contract_id: "",
    min_salary: "",
    max_salary: "",
    description: "",
    city_job: "",
    remote: "",
    date: new Date().toISOString(),
    prerequisites: "",
    tech_name: "",
    department: "",
  });

  const handleChange = (e) => {
    setFormData((previousValue) => ({
      ...previousValue,
      [e.target.name]: e.target.value,
    }));
  };

  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formattedDate = new Date(formData.date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const requestData = {
      ...formData,
      date: formattedDate,
    };

    const url = `${import.meta.env.VITE_BACKEND_URL}/api/offer`;

    if (
      !/^[0-9]*$/.test(formData.min_salary) ||
      !/^[0-9]*$/.test(formData.max_salary)
    ) {
      setError(
        "Caractères numériques uniquement autorisés pour le champ salaire"
      );
    } else if (
      formData.job &&
      formData.contract_id &&
      formData.min_salary &&
      formData.max_salary &&
      formData.description &&
      formData.city_job &&
      formData.remote &&
      formData.prerequisites &&
      formData.tech_name
    ) {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => {
          if (response.status !== 200) {
            console.error(response.statusText);
          }
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    } else {
      setError("Merci de compléter tous les champs");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/offer/jobList`
        );
        const data = await response.json();
        setOfferData(data);
      } catch (err) {
        console.error("Error fetching offer data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="offer_creation">
      <HeaderBasic />
      <div className="boxWithoutHeader">
        <div>
          <div className="page_title">
            <h1>Nouvelle offre</h1>
          </div>
          <form onSubmit={handleSubmit} className="input">
            <div className="offerinputs">
              <InputListe
                label="Poste"
                name="job"
                placeholder="Selectionner un métier"
                handleChange={handleChange}
                data={offerData.map((offer) => ({
                  value: offer.job,
                  name: offer.job,
                }))}
              />

              <InputListe
                label="Type de contrat"
                name="contract_id"
                placeholder="Selectionner un contrat"
                handleChange={handleChange}
                data={[
                  { value: "1", name: "CDI" },
                  { value: "2", name: "CDD" },
                  { value: "3", name: "Alternance" },
                  { value: "4", name: "Interim" },
                ]}
              />
              <InputTexte
                label="Salaire annuel brut minimum (euros)"
                name="min_salary"
                placeholder="30000"
                handleChange={handleChange}
                type="text"
              />
              <InputTexte
                label="Salaire annuel brut maximum (euros)"
                name="max_salary"
                placeholder="35000"
                handleChange={handleChange}
                type="text"
              />

              <Textearea
                label="Missions du poste"
                name="description"
                placeholder="Description"
                handleChange={handleChange}
                rows={3}
                type="text"
              />

              <InputTexte
                label="Localisation"
                placeholder="Indiquer la ville"
                name="city_job"
                handleChange={handleChange}
                type="text"
              />

              <InputListe
                label="Télétravail"
                placeholder="Selectionner un mode de télétravail"
                name="remote"
                handleChange={handleChange}
                data={[
                  { value: "total", name: "total" },
                  { value: "partiel", name: "partiel" },
                  { value: "occasionnel", name: "occasionnel" },
                ]}
              />

              <Textearea
                label="SoftSkills"
                placeholder="Description"
                name="prerequisites"
                handleChange={handleChange}
                rows={9}
                type="text"
              />

              <InputListe
                label="Hard Skills"
                placeholder="Hard Skills"
                name="tech_name"
                handleChange={handleChange}
                data={[
                  { value: "1", name: "Java" },
                  { value: "2", name: "C#" },
                  { value: "3", name: "PHP" },
                  { value: "4", name: "Python" },
                  { value: "5", name: "React" },
                ]}
              />

              <div className="offerEnd">
                <BlackButton
                  buttonName="Ajouter cette offre"
                  buttonFunction={(event) => {
                    event.preventDefault();
                    handlePopup1Open();
                    handleSubmit(event);
                  }}
                />
                {showPopup1 && (
                  <Popup
                    title=""
                    message={error || "L'offre d'emploi a bien été publiée"}
                    open={showPopup1}
                    onClose={handlePopup1Close}
                    buttonname="Retour au Dashboard"
                  />
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfferCreation;
