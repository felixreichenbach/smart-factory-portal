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
      <h1>test</h1>
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
        <Table>
          <thead>
            <tr>
              <th>Color</th>
              {/* <th>First Name</th>
              <th>Last Name</th> */}
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map(({ _id, color, address}) => (
              <tr>
                <td>{color}</td>
                {/* <td>{firstName}</td>
                <td>{lastName}</td> */}
                <td>{address}</td>
              </tr>
            ))}
          </tbody>
        </Table>
  ));
}
