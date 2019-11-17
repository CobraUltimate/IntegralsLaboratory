import React, { Component } from "react";
import MathJax from 'react-mathjax2'

class MathDisplay extends Component{
    constructor(){
        super();
        this.state = {
            expression: "$$" + this.props + "$$"
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            expression: "$$" + nextProps.expression + "$$"
        });
    }
    render() {
        const { expression } = this.state;
        return (
            <MathJax.Context
                input = { expression }
                onLoad={ () => console.log("Loaded MathJax script!") }
                onError={ (MathJax, error) => {
                    console.warn(error);
                    console.log("Encountered a MathJax error, re-attempting a typeset!");
                    MathJax.Hub.Queue(
                    MathJax.Hub.Typeset()
                    );
                } }
                script="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.2/MathJax.js?config=AM_HTMLorMML"
                options={ {
                    asciimath2jax: {
                        useMathMLspacing: true,
                        delimiters: [["$$","$$"]],
                        preview: "none",
                    }
                } }
            >
                <MathJax.Text text={expression}/>
            </MathJax.Context>
        );
    }
}
export default MathDisplay;