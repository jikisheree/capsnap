"use client";

import React, { useEffect, useTransition } from "react";
import { getStockHistory } from "../actions";
import { ProductProps } from "./CateCard";
import StockHistoryTable from "./StockHistoryTable";

export interface StockHistoryProps {
  update_at: string;
  update_by: string;
  unit: number;
  update_type: string;
}

const HistoryModal = ({
  product,
  history,
}: {
  product: ProductProps;
  history: StockHistoryProps[] | undefined;
}) => {
  //   const dialog = document.getElementById(`addproduct-${category_id}`);

  return (
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h1 className="font-bold text-2xl mb-5">
        {product.product_name} Stock History.
      </h1>
      <StockHistoryTable history={history} />
      <div className="modal-action">
        <form method="dialog">
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default HistoryModal;
