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
            for (let j = 0; j < 8; j++) {
                if (j == 0) {
                    id.push(<td>{Number(this.state.params["exerciseId" + i]) + 1}</td>)
                } else if (j == 1) {
                    id.push(<td>{this.state.params["expression" + i]}</td>)
                } else if (j == 2) {
                    id.push(<td>{this.state.params["xStart" + i]}</td>)
                } else if (j == 3) {
                    id.push(<td>{this.state.params["xFinal" + i]}</td>)
                } else if (j == 4) {
                    id.push(<td>{this.state.params["creationDate" + i]}</td>)
                } else if (j == 5) {
                    id.push(<td><button onClick={(e) => this.deleteRow(this.state.params["exerciseId" + i],this.state.params["xStart" + i],this.state.params["xFinal" + i], e)}>EDIT</button></td>)
                } else if (j == 6) {
                    id.push(<td><button onClick={(e) => this.deleteRow(this.state.params["exerciseId" + i],this.state.params["expression" + i],this.state.params["xStart" + i],this.state.params["xFinal" + i],this.state.params["creationDate" + i] , e)}>DUPLICATE</button></td>)
                } else if (j == 7) {
                    {/*así?*/}
                    id.push(<td><button onClick={(e) => this.deleteRow(this.state.params["exerciseId" + i], e)}>DELETE</button></td>)
                }

            }
            rows.push(<tr>{id}</tr>)
        }
        return rows
    }

    render() {

        return (
            <div>
                <section>
                <form action="ExerciseWindow" method="get" className="center-text">
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
                        <h1>INTEGRALS LABORATORY</h1>
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
              <i>♥</i> by Ramses, Antonio y Paz
            </div>

                <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
            </div>
        );
    }

}


export default Table;