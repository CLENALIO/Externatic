import React from "react";
import HeaderBasic from "../../components/Header/HeaderBasic";
import BlackButton from "../../components/Elements/BlackButton";
import WhiteButton from "../../components/Elements/WhiteButton";
import InputText from "../../components/Elements/InputText";
import InputList from "../../components/Elements/InputList";

function HomePage() {
  return (
    <div className="HomePage">
      <HeaderBasic />
      <BlackButton />
      <WhiteButton />
      <InputText />
      <InputList />
    </div>
  );
}

export default HomePage;
