import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center gap-5">
        <div className="h-2/4 card card-compact w-80 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://images.unsplash.com/photo-1600267165477-6d4cc741b379?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="adddata"
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
        <div className="h-2/4 card card-compact w-80 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://thebulletin.org/wp-content/uploads/2023/08/AdobeStock_580829354-1024x683.jpeg"
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
        <div className="h-2/4 card card-compact w-80 bg-base-100 shadow-xl">
          <figure>
            <img
              src="https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg"
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
