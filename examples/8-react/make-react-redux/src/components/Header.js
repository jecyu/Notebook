import React, { Component } from "react";
import Protypes from "prop-types";

class Header extends Component {
  static propsTypes = {
    themeColor: Protypes.string,
  };

  render() {
    return <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>;
  }
}

export default Header;
