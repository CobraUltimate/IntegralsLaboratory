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
            let id = [];
            id.push(<td>{Number(this.state.params["exerciseId" + i]) + 1}</td>)
            id.push(<td>{this.state.params["expression" + i]}</td>)
            id.push(<td>{this.state.params["xStart" + i]}</td>)
            id.push(<td>{this.state.params["xFinal" + i]}</td>)
            id.push(<td>{this.state.params["creationDate" + i]}</td>)
            id.push(<td><button onClick={(e) => this.sendRedirect("ExcerciseWindow/?exerciseId=" + this.state.params["exercisesId" + i] + "&expression=" + this.satate.params["expression" + i] + "&xStart=" + this.state.params["xStart" + i] + "&xFinal=" + this.state.params["xFinal" + i] + "&creationDate=" + this.state.params["creationDate" + i], e)}>EDIT</button></td>)
            id.push(<td><button onClick={(e) => this.deleteRow(this.state.params["exerciseId" + i],this.state.params["expression" + i],this.state.params["xStart" + i],this.state.params["xFinal" + i],this.state.params["creationDate" + i] , e)}>DUPLICATE</button></td>)
            id.push(<td><button onClick={(e) => this.deleteRow(this.state.params["exerciseId" + i], e)}>DELETE</button></td>)
            rows.push(<tr>{id}</tr>)
        }
        return rows
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
              <i>♥</i> by Ramses, Antonio and Paz
            </div>

                <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
            </div>
        );
    }

}


export default Table;