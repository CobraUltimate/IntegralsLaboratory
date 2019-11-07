import React, { Component } from "react";
import ReactDOM from "react-dom";
import MathML from 'react-math';
import LayoutSplitter from '../layout/LayoutSplitter.jsx';
import Input from "../presentational/Input.jsx";
import "./style.css";
import nerdamer from "../../../../nerdamer-master/nerdamer.core";
import integrate from "../../../../nerdamer-master/Calculus";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      expression: "",
      integral: "",
      startX: "",
      finalX: "",
      definiteIntegral: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  sendData = () => {
    this.props.sendIntegral(this.state.integral);
  }
  handleChange(event) {
    try {
      const expressionIntegral = nerdamer("integrate(" + event.target.value + ",x)");
      this.setState({ 
        [event.target.id]: event.target.value,
        integral: expressionIntegral
      });
      this.props.sendIntegral(expressionIntegral);
    } catch (error) {
      this.setState({ 
        [event.target.id]: event.target.value,
        integral: ""
      });
    }
  }
  
  render() {
    const { expression } = this.state;
    const { integral } = this.state;
    const { startX } = this.state;
    const { finalX } = this.state;
    const { definiteIntegral } = this.state;
    return (
      <form id="integral-form" className="center-text">
        <Input
          text="Expression"
          label="expression"
          type="text"
          id="expression"
          value={expression}
          handleChange={this.handleChange}
        />
        <MathML text='e^(i pi)=-1'/>
        <Input
          text="Integral"
          label="integral"
          type="text"
          id="integral"
          value={integral}
          handleChange={this.handleChange}
        />
        <div>
          <LayoutSplitter
              leftColumn={(
                <div className="x-values-input">
                  <Input
                    text="Start X"
                    label="startX"
                    type="text"
                    id="startX"
                    value={startX}
                    handleChange={this.handleChange}
                  />
                </div>
              )}
              rightColumn={(
                <div className="x-values-input">
                  <Input
                    text="Final X"
                    label="finalX"
                    type="text"
                    id="finalX"
                    value={finalX}
                    handleChange={this.handleChange}
                  />
                </div>
              )}
              leftColumnPercent="50%"
              rightColumPercent="50%"
          />
        </div>
        <Input
          text="Definite Integral"
          label="definiteIntegral"
          type="text"
          id="definiteIntegral"
          value={definiteIntegral}
          handleChange={this.handleChange}
        />
      </form>
    );
  }
}
export default FormContainer;