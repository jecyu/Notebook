import React, { Component } from "react";
import "./App.css";
import Header from "./containers/Header";
import Content from "./containers/Content";
import { Provider } from "react-redux";


import { createStore } from 'redux' // 使用官方的 redux

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
