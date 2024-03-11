import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="ml-24 mt-20 grid grid-cols-3 justify-center h-screen">
        <div className="h-2/3 card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Add New Data!</h2>
            <p>Add Product Data Set for training model to know new products</p>
            <div className="card-actions justify-end">
              <Link
                href="https://drive.google.com/drive/folders/1Gb8hhryEwnBMVzFV0fABDMz8z7MTgCQi?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button className="btn btn-primary">GO</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-2/3 card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Train Model!</h2>
            <p>Training the model to recognize new products</p>
            <div className="card-actions justify-end">
              <Link
                href="https://drive.google.com/file/d/1vV6_aNKm74wJP-uW-_WkNWjsllOmUcic/view?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button className="btn btn-primary">GO</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="h-2/3 card card-compact w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Export model!</h2>
            <p>Exporting your trained machine learning model</p>
            <div className="card-actions justify-end">
              <Link
                href="https://drive.google.com/drive/folders/12WMy9_RcEpFcYYbzkCTRKG-jwD0kAfLt?usp=sharing"
                rel="noopener noreferrer"
                target="_blank"
              >
                <button className="btn btn-primary">GO</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
