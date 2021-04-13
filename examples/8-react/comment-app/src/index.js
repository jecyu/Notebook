// import React from 'react';
// import ReactDOM from 'react-dom';
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

import dva from "dva";
import router from "./router";
import comment from "./models/comment";
const app = dva();

app.model(comment);
app.router(router);
app.start("#root");

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
