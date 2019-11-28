import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./style.css";


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
            for (let j = 0; j < 7; j++) {
                if (j == 0) {
                    id.push(<td>{this.state.params["exerciseId" + i]}</td>)
                } else if (j == 1) {
                    id.push(<td>{this.state.params["expression" + i]}</td>)
                } else if (j == 2) {
                    id.push(<td>{this.state.params["xStart" + i]}</td>)
                } else if (j == 3) {
                    id.push(<td>{this.state.params["xFinal" + i]}</td>)
                } else if (j == 4) {
                    id.push(<td>{this.state.params["creationDate" + i]}</td>)
                } else if (j == 5) {
                    id.push(<td>MODIFY</td>)
                } else if (j == 6) {
                    id.push(<td>DELETE</td>)
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
                    <h1>Tecnologias para la Web</h1>
                    <div className="tbl-header">
                        <table cellPadding="0" cellSpacing="0" border="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>EXPRESION</th>
                                    <th>X START</th>
                                    <th>X END</th>
                                    <th>DATE</th>
                                    <th>MODIFY</th>
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
              <i>♥</i> by Ramses, Scarlott y Paz
            </div>
                {/*<div>
                    <span style={{ cursor: "not-allowed" }}>
                        <Button component={Link} disabled>disabled</Button>
                    </span>
                </div>*/}

                <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script><script src="./script.js"></script>
            </div>
        );
    }

}


export default Table;