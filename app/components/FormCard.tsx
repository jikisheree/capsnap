import React from "react";

interface props {
  signType: string;
  children: React.ReactNode;
}

const FormCard = ({ signType, children }: props) => {
  return (
    <main className="h-screen flex items-center justify-center p-6 bg-gradient-to-t from-blue-200 from-30%">
      <div className="p-8 rounded-lg shadow-md w-2/3 flex">{children}</div>
    </main>
  );
};

export default FormCard;
