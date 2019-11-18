import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from './components/layout/LayoutSplitter.jsx';
import FormContainer from './components/container/FormContainer.jsx';
import Graph from './components/graph/Graph.jsx';

import "./style.css";

class MainWindow extends Component {
    constructor() {
        super();
        this.state = {
            expression: "x*x",
            xStart: "0",
            xFinal: "0"
        }
    }
    getExpression = (childData) => {
        this.setState({expression: childData})
    }
    getGraphStart = (childData) => {
        this.setState({xStart: childData})
    }
    getGraphFinal = (childData) => {
        this.setState({xFinal: childData})
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <Graph 
                    expression={this.state.expression.toString()}
                    xStart={this.state.xStart}
                    xFinal={this.state.xFinal}
                />
            )}
            rightColumn={(
                <div className="outer-div">
                        <div>
                            <FormContainer 
                                sendExpression={this.getExpression}
                                sendGraphStart={this.getGraphStart}
                                sendGraphFinal={this.getGraphFinal}
                            />
                        </div>
                </div>
            )}
            leftColumnPercent="80%"
            rightColumPercent="20%"
        />
      );
    }
  }
  
  export default MainWindow;
  const wrapper = document.getElementById("main-window");
  wrapper ? ReactDOM.render(<MainWindow />, wrapper) : false;