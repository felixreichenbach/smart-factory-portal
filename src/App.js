import logo from './logo.svg';
import './App.css';


// Apollo
import {
  useQuery
} from "@apollo/client";
import { GET_ORDERS } from "./graphql_ops";


function GetOrders() {

  const { loading, error, data } = useQuery(GET_ORDERS, {
    //variables: { query: { title: searchText } }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return data.orders.map(({ _id, content, userId }) => (
    <div key={_id}>
      <p>
        {content}: {userId}
      </p>
    </div>
  ));
}



function App() {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  //const [user, setUser] = React.useState(app.currentUser);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <GetOrders />
      </header>
    </div>
  );
}

export default App;
