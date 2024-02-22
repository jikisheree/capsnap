import React from "react";
import { TableReportProps } from "../page";

const SaleTable = ({
  saleData = [],
}: {
  saleData: TableReportProps[] | null;
}) => {
  console.log(saleData);
  return (
    <div className="justify-center overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>Product</th>
            {saleData?.[0]?.price && <th>Price</th>}
            {saleData?.[0]?.sold_product && <th>Product(s)</th>}
            <th>Sold unit</th>
            <th>Total amount</th>
          </tr>
        </thead>
        <tbody>
          {saleData?.map((item: TableReportProps, index: number) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.name}</td>
              {item.price && <td>{item.price}</td>}
              {item.sold_product && (
                <td className="grid grid-cols-3">
                  {item.sold_product.map((product, productIndex) => (
                    <span key={productIndex} className="border p-2">
                      {product}
                    </span>
                  ))}
                </td>
              )}
              <td>{item.total_sold_units}</td>
              <td>{item.total_received}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Product</th>
            <th>Price</th>
            <th>Sold unit</th>
            <th>Total amount</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SaleTable;
