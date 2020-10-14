import React, { Component } from "react";
import PropTypes from "prop-types";
// import { connect } from "./react-redux";
import { connect } from "react-redux"

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

const mapStateProps = (state) => {
  return {
    themeColor: state.themeColor,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: "CHANGE_COLOR", themeColor: color });
    },
  };
};

ThemeSwitch = connect(mapStateProps, mapDispatchProps)(ThemeSwitch);

export default ThemeSwitch;
