import React from "react";
import { CustomerProps } from "../page";

const Table = ({ customers = [] }: { customers: CustomerProps[] }) => {
  return (
    <div className="justify-center overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Birth date</th>
            <th>Joined at</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item: CustomerProps, index: number) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>
                {new Date(item.birth_date).toLocaleString([], {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </td>
              <td>{new Date(item.join_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Birth date</th>
            <th>Joined at</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
