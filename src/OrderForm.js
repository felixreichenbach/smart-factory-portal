// OrderFrom Component

import React from 'react';

export class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      content: "" 
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    console.log("Content: " + this.state.content);

    // @Meaghan
    // the realm app is part of the props and can be addressed like this: "this.props.app"
    // Code to access MongoDB collections folllowing this guide: https://docs.mongodb.com/realm/web/mongodb/#instantiate-a-mongodb-collection-handle
    const mongodb = this.props.app.currentUser.mongoClient("mongodb-atlas");
    const orders = mongodb.db("factory-shop").collection("orders");


  orders.insertOne({
      content: this.state.content,
      userId: this.props.app.currentUser.id
    }).then(result => console.log("Result: " + result));
    alert("A new order was submitted!");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>New Order</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Content:
            <input
              name="content"
              type="text"
              //value={this.state.content}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
