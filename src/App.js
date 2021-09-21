import logo from './logo.svg';
import './App.css';
import { OrderForm } from './OrderForm';
import { LoginForm } from './LoginForm';
import { OrdersView } from './OrdersView';


function App() {
  // Keep the logged in Realm user in local state. This lets the app re-render
  // whenever the current user changes (e.g. logs in or logs out).
  //const [user, setUser] = React.useState(app.currentUser);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Login Form</h1>
        <LoginForm />
        <h1>Orders Overview</h1>
        <OrdersView />
        <h1>Order Form</h1>
        <OrderForm />
      </header>
    </div>
  );
}

export default App;
