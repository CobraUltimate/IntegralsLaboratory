import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

class LayoutSplitter extends Component {
  render() {
    const { leftColumn,rightColumn,leftColumnPercent,rightColumPercent} = this.props;
    return (
      <div className="row">
        <div className="left-column" style={{width : leftColumnPercent}}>
          {leftColumn}
        </div>
        <div className="right-column" style={{width : rightColumPercent}}>
          {rightColumn}
        </div>
      </div>
    );
  }
}

LayoutSplitter.propTypes = {
  leftColumn: PropTypes.node.isRequired,
  rightColumn: PropTypes.node.isRequired,
  leftColumnPercent: PropTypes.node.isRequired,
  rightColumPercent: PropTypes.node.isRequired
};

export default LayoutSplitter;