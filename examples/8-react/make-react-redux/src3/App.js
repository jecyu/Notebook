import React, { Component } from "react";
import PropTypes from "prop-types";
import "./App.css";
import Header from "./Header";
import Content from "./Content";
import { Provider } from "./react-redux";

function createStore(reducer) {
  let state = null;
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  dispatch({}); // 初始化 state

  return { getState, dispatch, subscribe };
}

function themeReducer(state, action) {
  if (!state)
    return {
      themeColor: "red",
    };
  switch (action.type) {
    case "CHANGE_COLOR":
      return { ...state, themeColor: action.themeColor };
    default:
      return state;
  }
}

const store = createStore(themeReducer);

class Index extends Component {
  // static childContextTypes = {
  //   store: PropTypes.object,
  // };

  // getChildContext() {
  //   return {
  //     store,
  //   };
  // }

  render() {
    return (
      <div>
        <Header />
        <Content />
      </div>
    );
  }
}

function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}

export default App;
