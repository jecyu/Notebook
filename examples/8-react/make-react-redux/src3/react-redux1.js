import React, { Component } from "react";
import PropTypes from "prop-types";

export const connect = (mapStateToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object,
    };

    constructor() {
      super();
      this.state = { allProps: {} };
    }

    componentWillMount() {
      const { store } = this.context;
      this._updateProps();
      store.subscribe(() => this._updateProps());
    }

    _updateProps() {
      const { store } = this.context;
      let stateProps = mapStateToProps(store.getState(), this.props); // 额外传入 props，让获取数据更加灵活方便
      this.setState({
        allProps: {
          // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...this.props,
        },
      });
    }

    render() {
      return <WrappedComponent {...this.state.allProps} />;
    }
  }
  return Connect;
};
