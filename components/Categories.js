import React from "react";
import { CgMenuGridR } from "react-icons/cg";
import { categories } from "../data/categories";

const Categories = () => {
  return (
    <div >
    <div className="col-span-3 cursor-pointer fixed hidden lg:block ">
      <section className="flex  h-[600px] flex-col px-6 space-y-6  bg-[#10100e] text-[#FFFFE3]">
        <div className="flex items-center space-x-4">
          <CgMenuGridR className="h-6 w-6" />
          <span>Categories</span>
        </div>
        {categories.map((items, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 font-medium"
            >
              <span className="text-[#FFFFE3]">{items.name}</span>
            </div>
          );
        })}
      </section>
    </div>
    </div>
  );
};

export default Categories;
