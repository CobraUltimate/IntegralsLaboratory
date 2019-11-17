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
            expression: "x*x"
        }
    }
    getExpression = (childData) => {
        this.setState({expression: childData})
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <Graph 
                    expression={this.state.expression.toString()}
                />
            )}
            rightColumn={(
                <div className="outer-div">
                        <div>
                            <FormContainer sendExpression={this.getExpression}/>
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