// OrderFrom Component

import React from 'react';

export class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async submitOrder() {

    // @Meaghan
    // the realm app is part of the props and can be addressed like this: "this.props.app"
    // Code to access MongoDB collections folllowing this guide: https://docs.mongodb.com/realm/web/mongodb/#instantiate-a-mongodb-collection-handle


    try {

      console.log("Try");

    } catch (err) {
      console.error("Failed: " + JSON.stringify(err));
    }
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    console.log(this.state.value);
    alert("A new order was submitted!");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>New Order</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
