import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import "./style.css";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
      this.setState({ 
        [event.target.id]: event.target.value
      });
  }
  render() {
    const { user } = this.state;
    const { password } = this.state;
    return (
      <form action="Loggin" method="get" className="center-text">
        <div>
          <div className="Absolute-Center">
            <div>
              <div className="input">
                <Input
                  text="User"
                  label="user"
                  type="text"
                  id="user"
                  value={user}
                  name="user"
                  handleChange={this.handleChange}
                />
              </div>
              <div className="input">
                <Input
                  text="Password"
                  label="password"
                  type="text"
                  id="password"
                  value={password}
                  name="password"
                  handleChange={this.handleChange}
                />
              </div>
              <div className="input">
                <Input
                  text=""
                  label="singIn"
                  type="submit"
                  id="singIn"
                  name="singIn"
                  value="Sing In"
                  handleChange={this.handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
export default FormContainer;
const wrapper = document.getElementById("form-container");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;