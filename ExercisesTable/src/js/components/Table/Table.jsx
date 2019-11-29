import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Input from "../presentational/Input.jsx";



class Table extends Component {

    getParameters(url, dict) {
        let i;
        for (i = 0; url.charAt(i) != '?' && i < url.length; i++);
        i++;
        for (; i < url.length; i++) {
            var key = "";
            var value = "";
            while (url.charAt(i) != '=') {
                key = key + url.charAt(i);
                i++;
            }
            i++;
            while (url.charAt(i) != '&' && i < url.length) {
                value = value + url.charAt(i);
                i++;
            }
            dict[key] = value;
            console.log(key);
        }
    }

    constructor() {
        super();
        var params = {};
        this.getParameters(window.location.href, params);
        this.state = {
            expression: "",
            integral: "",
            startX: "",
            finalX: "",
            definiteIntegral: "",
            params: params
        };
    }



    createTable() {
        let rows = []
        for (let i = 0; i < Number(this.state.params["exercisesNumber"]); i++) {
            const exerciseId = Number(this.state.params["exerciseId" + i]);
            const expression = this.state.params["expression" + i];
            const xStart = this.state.params["xStart" + i];
            const xFinal = this.state.params["xFinal" + i];
            let data = [];
            data.push(<td>{exerciseId + 1}</td>)
            data.push(<td>{expression}</td>)
            data.push(<td>{xStart}</td>)
            data.push(<td>{xFinal}</td>)
            data.push(<td>{this.state.params["creationDate" + i]}</td>)
            data.push(<td><button class="table-form-button" id={i} onClick={ (e) => this.goExerciseWindow(e = {id: i}) }>EDIT</button></td>)
            data.push(<td><button class="table-form-button" id={i} onClick={ (e) => this.cloneExercise(e = {id: i}) }>CLONE</button></td>)
            data.push(<td><button class="table-form-button" id={i} onClick={ (e) => this.deleteExercise(e = {id: i}) }>DELETE</button></td>)
            rows.push(<tr>{data}</tr>)
        }
        return rows
    }

    goExerciseWindow(e){
        var i = e.id;
        const exerciseId = Number(this.state.params["exerciseId" + i]);
        const expression = this.state.params["expression" + i];
        const xStart = this.state.params["xStart" + i];
        const xFinal = this.state.params["xFinal" + i];
        window.location = "exerciseWindow.html?exerciseId=" + exerciseId + "&expression=" + expression + "&xStart=" + xStart + "&xFinal=" + xFinal;
    }

    deleteExercise(e){
        var i = e.id;
        const exerciseId = Number(this.state.params["exerciseId" + i]);
        window.location = "DeleteExercise?exerciseId=" + exerciseId;
    }

    cloneExercise(e){
        var i = e.id;
        const expression = this.state.params["expression" + i];
        const xStart = this.state.params["xStart" + i];
        const xFinal = this.state.params["xFinal" + i];
        window.location = "CloneExercise?" + "expression=" + expression + "&xStart=" + xStart + "&xFinal=" + xFinal;
    }

    render() {

        return (
            <div>
                <section>
                <form action="SaveExercise" method="get" className="center-text">
                        <div className="container-table-form-btn">
                            <Input
                                text=""
                                class="table-form-btn"
                                label="next"
                                type="submit"

                                id="this"
                                name="next"
                                value=" Nuevo Ejercicio "
                            />
                        </div>
                    </form>
                    <div className="tbl-header">
                        <h1><font color="white">INTEGRALS LABORATORY</font></h1>
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>EXPRESION</th>
                                    <th>X START</th>
                                    <th>X END</th>
                                    <th>DATE</th>
                                    <th>EDIT</th>
                                    <th>DUPLICATE</th>
                                    <th>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.createTable()}
                            </tbody>
                        </table>
                    </div>
                   

                </section>

                <div className="made-with-love">
                    Made with
              {<i>♥</i> + " by Ramsés, Antonio & Paz"}
            </div>

                <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
            </div>
        );
    }

}


export default Table;