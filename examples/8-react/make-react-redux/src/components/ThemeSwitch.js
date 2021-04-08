import React, { Component } from "react";
import PropTypes from "prop-types";

class ThemeSwitch extends Component {
  static contextTypes = {
    themeColor: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      themeColor: "",
    };
  }

  // dispatch action 去改变颜色
  handleSwitchColor(color) {
    if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color);
    }
  }

  render() {
    return (
      <div>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, "red")}
        >
          Red
        </button>
        <button
          style={{ color: this.props.themeColor }}
          onClick={this.handleSwitchColor.bind(this, "blue")}
        >
          Blue
        </button>
      </div>
    );
  }
}

export default ThemeSwitch;
