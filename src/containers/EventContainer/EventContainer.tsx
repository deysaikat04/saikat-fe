import React from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header/Header";

const EventContainer = () => {
  return (
    <div className="flex p-24 flex-col space-y-4 justify-center m-auto">
      <Header title={"Events"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default EventContainer;
