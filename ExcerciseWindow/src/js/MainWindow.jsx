import React, { Component } from "react";
import ReactDOM from "react-dom";
import LayoutSplitter from './components/layout/LayoutSplitter.jsx';
import FormContainer from './components/container/FormContainer.jsx';
import Plot from 'react-function-plot';
import "./style.css";

class MainWindow extends Component {
    constructor() {
        super();
    }
    render() {
      return (
        <LayoutSplitter
            leftColumn={(
                <p>'Aquí iría la gráfica, si tan solo la hubieramos hecho.jpg'</p>
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