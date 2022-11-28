import React from "react";
import secure from "../public/images/secure.png";
import delivery from "../public/images/delivery.png";
import mall from "../public/images/mall.png";
import matic from "../public/images/matic.webp";
import Service from "./Service";

const ServiceItem = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4  gap-5 items-center justify-center">
      <Service
        image={secure}
        title="Total Security"
        text="Secure trading system that never lacks trust, every transaction made is transparent and immutable."
      />
      <Service
        image={delivery}
        title="All in one"
        text="MarketPride takes care of everything from marketing and payments of secure transactions and shipping, all thanks to our transaction partner Polygon."
      />
      <Service
        image={matic}
        title="Ethereum Payment"
        text="Cheap amd easy payment all in open one place, with polygon scalability transaction is made easy for you."
      />
            <Service
        image={mall}
        title="Create a store"
        text="Create a store on the ethereum blockchain, with well secured transaction and at an easy cost."
      />
    </div>
  );
};

export default ServiceItem;
