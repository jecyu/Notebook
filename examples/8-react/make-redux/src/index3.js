let appState = {
  title: {
    text: "React.js 小书",
    color: "red",
  },
  content: {
    text: "React.js 小书内容",
    color: "blue",
  },
};

function stateChanger(state, action) {
  switch (action.type) {
    case "UPDATE_TITLE_TEXT":
      state.title.text = action.text;
      break;
    case "UPDATE_TITLE_COLOR":
      state.title.color = action.color;
      break;
    default:
      break;
  }
}

function createStore(state, stateChanger) {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const getState = () => state;
  const dispatch = (action) => {
    stateChanger(state, action);
    listeners.forEach((listener) => listener());
  };
  return { getState, dispatch, subscribe };
}

function renderApp(state) {
  console.log("render app...");
  renderTitle(state.title);
  renderContent(state.content);
}

function renderTitle(title) {
  console.log("render title...");
  const titleDOM = document.getElementById("title");
  titleDOM.innerHTML = title.text;
  titleDOM.style.color = title.color;
}

function renderContent(content) {
  console.log("render content...");
  const contentDOM = document.getElementById("content");
  contentDOM.innerHTML = content.text;
  contentDOM.style.color = content.color;
}

const store = createStore(appState, stateChanger);

// 首次渲染页面
renderApp(store.getState()) // 首次渲染页面
store.subscribe(() => renderApp(store.getState()));
store.dispatch({ type: "UPDATE_TITLE_TEXT", text: "《React.js 小书》" }); // 修改标题文本
store.dispatch({ type: "UPDATE_TITLE_COLOR", color: "blue" }); //修改标题颜色
