import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from './components/layout/LayoutSplitter.jsx';
import FormContainer from './components/container/FormContainer.jsx';
import Plot from 'react-function-plot';
import "./style.css";

class MainWindow extends Component {
    constructor() {
        super();
        this.state = {
            integral: "Waiting Data"
        }
    }
    getIntegral = (childData) => {
        this.setState({integral: childData})
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <p>Integral: {this.state.integral}</p>
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