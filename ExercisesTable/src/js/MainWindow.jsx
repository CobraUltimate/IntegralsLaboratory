import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./MainWindowStyle.css";
import Table from "../js/components/Table/Table.jsx";

class MainWindow extends Component {
    constructor() {
      super();
      this.state = {
          nombre: this.props,
          cola: "hola"
      }
    }

    render (){
        const { cola } = this.state;

        return (
            <Table/>
        );
    }
}

export default MainWindow;

const wrapper = document.getElementById("main-window");
wrapper ? ReactDOM.render(<MainWindow />, wrapper) : false;