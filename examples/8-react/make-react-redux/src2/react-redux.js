import React, { Component } from "react";
import PropTypes from "prop-types";

export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object,
    };

    constructor() {
      super();
      this.state = { allProps: {} }; // 用来保存需要传给被包装组件的所有的参数
    }

    componentWillMount() {
      const { store } = this.context;
      this._updateProps(); // 初始化 Props
      store.subscribe(() => this._updateProps()); // 监听数据变化，重新调用 _updateProps
    }

    _updateProps() {
      const { store } = this.context;
      // 可以把传给 Connect 组件的 props 参数也传给它，props + state 生成被包装组件的参数
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props) : {}; // 防止 mapStateToProps 没有传入
      let dispatchProps = mapDispatchToProps ? mapDispatchToProps(store.dispatch, this.props) : {}; // 防止 mapDispatchProps 没有传入
      this.setState({
        allProps: {
          // 整合普通的 props 和从 state 生成的 props
          ...stateProps,
          ...dispatchProps,
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
