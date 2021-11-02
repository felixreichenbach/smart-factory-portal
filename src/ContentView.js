import React from "react";

//bootstrap
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

// Apollo
import { useQuery } from "@apollo/client";

import { GET_ORDERS } from "./graphql_ops";

export function ContentView() {
  return (
    <div>
      <h1>Orders Overview</h1>
      <OrdersView />
    </div>
  );
}

function OrdersView() {
  const { loading, error, data } = useQuery(GET_ORDERS, {
    //variables: { query: { title: searchText } }
  });

  if (loading) {
    console.log("loading");
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(data);
    console.log("Error: " + error);
    return <p>Error :(</p>;
  }
  console.log(data);
  
  return ((
        <Table class="table table-bordered">
          <thead>
            <tr>
              <th>Color</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map(({ _id, color, address, firstName, lastName, orderStatus}) => (
              <tr>
                <td>{color}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{address}</td>
                <td>{orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  ));
}
