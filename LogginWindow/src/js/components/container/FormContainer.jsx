import React, { Component } from "react";
import ReactDOM from "react-dom";
import Input from "../presentational/Input.jsx";
import "./style.css";
import "./useful.css";

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
   <div class="limiter">
		<div class="container-login">
			<div class="wrap-login">
      <form action="Loggin" method="get" className="center-text">
        
          <div className="login-form validate-form p-l-55 p-r-55 p-t-178">
            
            <span class="login-form-title">
						Loggin
					</span>
          </div>
          
              <div className="wrap-input100 validate-input m-b-16">
                <Input
                class="input100"
                  text="User"
                  label="user"
                  type="text"
                  id="user"
                  value={user}
                  name="user"
                  handleChange={this.handleChange}
                />
                <span class="focus-input100"></span>
              </div>
              <div className="wrap-input100 validate-input">
                <Input
                class="input100"
                  text="Password"
                  label="password"
                  type="text"
                  id="password"
                  value={password}
                  name="password"
                  handleChange={this.handleChange}
                />
                <span class="focus-input100"></span>
              </div>
              <div className="container-login-form-btn">
                <Input
                  text=""
                  class="login-form-btn"
                  label="singIn"
                  type="submit"
                  id="singIn"
                  name="singIn"
                  value="Sing In"
                  handleChange={this.handleChange}
                />
              </div>
          
              
      </form>
      </div>
     </div>
     </div>
    );
  }
}
export default FormContainer;
const wrapper = document.getElementById("form-container");
wrapper ? ReactDOM.render(<FormContainer />, wrapper) : false;