import React, { Component } from "react";
import Protypes from "prop-types";
import { connect } from "./react-redux";

class Header extends Component {
  static propsTypes = {
    themeColor: Protypes.string,
  };

  //   componentWillMount() {
  //     const { store } = this.context;
  //     this._updateThemeColor();
  //     store.subscribe(() => this._updateThemeColor())
  //   }

  //   _updateThemeColor() {
  //     const { store } = this.context;
  //     const state = store.getState();
  //     this.setState({ themeColor: state.themeColor });
  //   }

  render() {
    return <h1 style={{ color: this.props.themeColor }}>React.js 小书</h1>;
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  };
};

Header = connect(mapStateToProps)(Header);

export default Header;
