// OrderFrom Component

import React from 'react';

//bootstrap
import Form from 'react-bootstrap/Form'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      address: "",
      color: "",
      firstName: "",
      lastName: "",
      orderStatus: "Order Submitted"
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
      address: this.state.address,
      color: this.state.color,
      userId: this.props.app.currentUser.id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      orderStatus: this.state.orderStatus,
    }).then(result => console.log("Result: " + result));
    alert("A new order was submitted!");
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <h1>Order Form</h1>
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="formName" >
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Address" 
                name="address"
                onChange={this.handleInputChange}
              />
          </Form.Group>
          <br />
          <Form.Group controlId="formName" >
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="First Name" 
                name="firstName"
                onChange={this.handleInputChange}
              />
          </Form.Group>
          <br />
          <Form.Group controlId="formName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Last Name" 
                name="lastName"
                onChange={this.handleInputChange}
              />
          </Form.Group>
          <br />
          <Form.Group>
              <Form.Label>
                Color
              </Form.Label>
                <Form.Check
                  type="radio"
                  label="Red"
                  name="color"
                  onChange={this.handleInputChange}
                  value="red"
                />
                <Form.Check
                  type="radio"
                  label="Blue"
                  name="color"
                  onChange={this.handleInputChange}
                  value="blue"
                />
                <Form.Check
                  type="radio"
                  label="White"
                  name="color"
                  onChange={this.handleInputChange}
                  value="white"
                />
          </Form.Group>
          <br />
          <Button variant="primary" type="submit" value="Submit">
            Submit
          </Button>
        </Form>
      </Container>
    </div>
    );
  }
}
