import React from "react";

interface props {
  signType: string;
  children: React.ReactNode;
}

const FormCard = ({ signType, children }: props) => {
  return (
    <main className="h-screen flex items-center justify-center bg-gray-800 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-2/3 flex">
        {children}
      </div>
    </main>
  );
};

export default FormCard;
