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
        this.getValues(xInitialValues,yInitialValues,-10,10,0.1, (x) => expr.evaluate({x: x}));
        this.state = {
            data: [
                {
                    name: "Expression",
                    x : xInitialValues,
                    y : yInitialValues,
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'blue'},
                },
                {
                    name: "Area down the curve",
                    x: [1, 2, 3, 4],
                    y: [0, 2, 3, 5],
                    fill: 'tozeroy',
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
                }
            ],
            layout: {autosize: true},
            frames: [],
            config: {},
            xStart: "0",
            xFinal: "-1"
        };
    }
  componentWillReceiveProps(nextProps) { 
    try {
        var expression;
        var xStart;
        var xFinal;
        if(nextProps.expression != this.props.expression){
            expression = nextProps.expression;
            xStart = this.state.xStart;
            xFinal = this.state.xFinal;
            this.setState({
                expression: expression
            });
        }
        else if(nextProps.xStart != this.props.xStart){
            expression = this.state.expression;
            xStart = nextProps.xStart;
            xFinal = this.state.xFinal;
            this.setState({
                xStart: nextProps.xStart
            });
        }
        else{
            expression = this.state.expression;
            xStart = this.state.xStart;
            xFinal = nextProps.xFinal;
            this.setState({
                xFinal: nextProps.xFinal
            });
        }
        const expr = math.compile(expression);
        const xNewValues = [];
        const yNewValues = [];
        this.getValues(xNewValues,yNewValues,-10,10,0.001, (x) => expr.evaluate({x: x}));
        
        const xShadowValues = [];
        const yShadowValues = [];
        this.getValues(xShadowValues,yShadowValues,parseInt(xStart),parseInt(xFinal),0.001,(x) => expr.evaluate({x: x}));

        const newLayout = Object.assign({}, this.state.layout);
        newLayout.datarevision++;
        this.setState({
            layout: newLayout,
            data: [
                {
                    name: "Expression",
                    x : xNewValues,
                    y : yNewValues,
                },
                {
                    name: "Area down the curve",
                    x: xShadowValues,
                    y: yShadowValues,
                    fill: 'tozeroy',
                    type: 'scatter',
                    mode: 'lines+points',
                    marker: {color: 'red'},
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