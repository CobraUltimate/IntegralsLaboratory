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
            integral: "x*x"
        }
    }
    getIntegral = (childData) => {
        this.setState({integral: childData})
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <Graph 
                    expression={this.state.integral.toString()}
                />
            )}
            rightColumn={(
                <div className="outer-div">
                        <div>
                            <FormContainer sendIntegral={this.getIntegral}/>
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