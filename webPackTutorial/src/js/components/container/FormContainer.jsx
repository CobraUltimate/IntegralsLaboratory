import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from '../layout/LayoutSplitter.jsx';
import Input from "../presentational/Input.jsx";
import "./style.css";
import nerdamer from "../../../../nerdamer-master/nerdamer.core";
import integrate from "../../../../nerdamer-master/Calculus";

class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      equation: "",
      integral: "",
      startX: "",
      finalX: "",
      definiteIntegral: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const integrateString = "integrate(" + event.target.value + ",x)";
    try {
      this.setState({ 
        [event.target.id]: event.target.value,
        integral: nerdamer(integrateString)
      });
    } catch (error) {
      this.setState({ 
        [event.target.id]: event.target.value,
        integral: ""
      });
    }
  }
  render() {
    const { equation } = this.state;
    const { integral } = this.state;
    const { startX } = this.state;
    const { finalX } = this.state;
    const { definiteIntegral } = this.state;
    return (
      <form id="integral-form" className="center-text">
        <Input
          text="Equation"
          label="equation"
          type="text"
          id="equation"
          value={equation}
          handleChange={this.handleChange}
        />
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