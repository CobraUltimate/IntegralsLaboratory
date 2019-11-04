import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from './components/layout/LayoutSplitter.jsx';
import FormContainer from './components/container/FormContainer.jsx';
import "./style.css";

class MainWindow extends Component {
    constructor() {
        super();
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <FormContainer/>
            )}
            rightColumn={(
                <div className="outer-div">
                        <div>
                            <FormContainer/>
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