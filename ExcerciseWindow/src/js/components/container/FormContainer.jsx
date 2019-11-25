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

    var params = {};
    this.getParameters(window.location.href,params);

    this.state = {
      expression: "",
      integral: "",
      startX: "",
      finalX: "",
      definiteIntegral: "",
      params: params
    };
    this.handleChange = this.handleChange.bind(this);
  }

  async save(url){
    let response = await fetch(url);
        if (response.ok) { // if HTTP-status is 200-299
          // get the response body (the method explained below)
          let json = await response.json();
          alert("HTTP-Error: " + response.status);
          alert("HTTP-Error: " + response.json);
        } else {
          alert("HTTP-Error: " + response.status);
        }
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
    var url;
    if ([event.target.id] == "expression"){
      try {
        const expressionIntegral = nerdamer("integrate(" + event.target.value + ",x)");
        this.setState({ 
          [event.target.id]: event.target.value,
          integral: expressionIntegral
        });
        this.props.sendExpression(event.target.value);

        url = "Autosave?exerciseId=" + this.state.params["exerciseId"] + "&expression=" + event.target.value + "&xStart=" + this.state.startX + "&xFinal=" + this.state.finalX;
        fetch(url);

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
        url = "Autosave?exerciseId=" + this.state.params["exerciseId"] + "&expression=" + this.state.expression + "&xStart=" + event.target.value + "&xFinal=" + this.state.finalX;
        fetch(url);
      }
      else{
        this.props.sendGraphFinal(event.target.value);
        url = "Autosave?exerciseId=" + this.state.params["exerciseId"] + "&expression=" + this.state.expression + "&xStart=" + this.state.startX + "&xFinal=" + event.target.value;
        fetch(url);
      }
    }
  }

  getParameters(url,dict){
    let i;
    for(i = 0;url.charAt(i) != '?' && i < url.length;i++);
    i++;
    for( ; i < url.length; i++){
      var key = "";
      var value = "";
      while(url.charAt(i) != '='){
        key = key + url.charAt(i);
        i++;
      }
      i++;
      while(url.charAt(i) != '&' &&  i < url.length){
        value = value + url.charAt(i);
        i++;
      }
      i++;
      dict[key] = value;
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
      <div>
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
      </div>
    );
  }
}
export default FormContainer;