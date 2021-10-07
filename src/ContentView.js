import React from "react";

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
    console.log("Error: " + error);
    return <p>Error :(</p>;
  }
  console.log(data);

  return data.orders.map(({ _id, content, userId }) => (
    <div key={_id}>
      <p>
        {content}: {userId}
      </p>
    </div>
  ));
}
