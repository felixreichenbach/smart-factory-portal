import React from "react";

export class StatusBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    try {
      await this.props.app.currentUser.logOut();
      this.props.setUser(this.props.app.currentUser);
    } catch (err) {
      console.log(err);
    }
  }

  async logout() {
    try {
      await this.app.currentUser.logOut();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <h1>Status Bar</h1>
        <button onClick={this.handleClick}>Logout</button>
      </div>
    );
  }
}
