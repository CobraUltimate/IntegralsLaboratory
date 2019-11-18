import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from '../layout/LayoutSplitter.jsx';
import Input from '../presentational/Input.jsx';
import MathDisplay from '../presentational/MathDisplay.jsx';
import "./style.css";
import nerdamer from "../../../../nerdamer-master/nerdamer.core";
import integrate from "../../../../nerdamer-master/Calculus";
import definiteIntegral from "../../../../nerdamer-master/Calculus";

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
  componentDidMount(){
    this.setState({
      expression: "",
      integral: "",
      definiteIntegral: ""
    });
    this.props.sendExpression("x");
  }
  handleChange(event) {
    if ([event.target.id] == "expression"){
      try {
        const expressionIntegral = nerdamer("integrate(" + event.target.value + ",x)");
        this.setState({ 
          [event.target.id]: event.target.value,
          integral: expressionIntegral
        });
        this.props.sendExpression(event.target.value);
      } catch (error) {
        this.setState({
          [event.target.id]: event.target.value,
          integral: ""
        });
      }
    }
    else{
      this.setState({ 
        [event.target.id]: event.target.value,
      });
      if(event.target.id == "startX"){
        this.props.sendGraphStart(event.target.value);
      }
      else{
        this.props.sendGraphFinal(event.target.value);
      }
    }
  }
  render() {
    const { expression } = this.state;
    const { integral } = this.state;
    const { startX } = this.state;
    const { finalX } = this.state;
    var { definiteIntegral } = this.state;
    try{
      definiteIntegral = nerdamer("defint(" + this.state.expression + "," + this.state.startX + "," + this.state.finalX + ",x)").toString();
    }
    catch(error){
    }
    var paddingTop = {paddingTop: '10px'};
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
        <MathDisplay expression = {expression}/>
        <div style={paddingTop}>
          <label>Integral</label>
          <MathDisplay expression = {integral.toString()}/>
        </div>
        <div style={paddingTop}>
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
        <div style={paddingTop}>
          <label>Definite Integral</label>
          <MathDisplay expression = {definiteIntegral}/>
        </div>
      </form>
    );
  }
}
export default FormContainer;