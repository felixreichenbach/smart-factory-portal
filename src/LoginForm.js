import React from "react";
// Realm
import * as Realm from "realm-web";
import assert from "assert";

export class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async loginEmailPassword(email, password) {

    const credentials = Realm.Credentials.emailPassword(email, password);

    try {
      // Authenticate the user
      const user = await this.props.app.logIn(credentials);
      // `App.currentUser` updates to match the logged in user
      assert(user.id === this.props.app.currentUser.id);
      console.log(user);
      return user;
    } catch (err) {
      console.error("Failed to log in", err);
    }
  }

  handleSubmit(event) {
    // Login Function
    this.loginEmailPassword(this.state.username, this.state.password).then(
      (user) => {
        console.log("Successfully logged in!");
        this.props.setUser(user);
      }
    );

    event.preventDefault();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input name="username" onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Password:
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
  }
}
