import React, { Component } from "react";
import ReactDOM from "react-dom";
import Plot from 'react-plotly.js';
import * as math from 'mathjs';
import nerdamer from "../../../../nerdamer-master/nerdamer.core";

class Graph extends Component {
    getValues(xValues,yValues,min,max,step,mapfunction){
        for (var i = min; i <= max; i+=step) {
            xValues.push(i);
            yValues.push(mapfunction(i));
        }
      }
    constructor() {
        super();
        const xInitialValues = [];
        const yInitialValues = [];
        const expr = math.compile("x*x");
        this.getValues(xInitialValues,yInitialValues,-10,10,0.5, (x) => expr.evaluate({x: x}));
        this.state = {
            data: [
                {
                    x : xInitialValues,
                    y : yInitialValues,
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'blue'},
                }
            ],
            layout: {autosize: true, title: ''},
            frames: [],
            config: {}
        };
    }
  componentWillReceiveProps(nextProps) {
    try {
        const expression = nextProps.expression;
        const expr = math.compile(expression);
        const xNewValues = [];
        const yNewValues = [];
        this.getValues(xNewValues,yNewValues,-10,10,0.5, (x) => expr.evaluate({x: x}));
        const newLayout = Object.assign({}, this.state.layout);
        newLayout.datarevision++;
        this.setState({
            layout: newLayout,
            data: [
                {
                    x : xNewValues,
                    y : yNewValues,
                }
            ] 
        })
    } catch (error) {
    }
  }
  render() {
    return (
        <Plot
            data = {this.state.data}
            layout = {this.state.layout}
            frames = {this.state.frames}
            config = {this.state.config}
            onInitialized = {(figure) => this.setState(figure)}
            onUpdate = {(figure) => this.setState(figure)}
            style={{ width: "95%", height: "95%", paddingLeft: "3%"}}
            useResizeHandler={true}
        />
    );
  }
}
export default Graph;