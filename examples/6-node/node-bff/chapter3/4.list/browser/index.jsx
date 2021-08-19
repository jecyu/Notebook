const Container = require("../components/container.jsx");
const React = require("react");
const ReactDOM = require("react-dom");

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      columns: reactInitData,
      filtType: reactInitFiltType,
      sortType: reactInitSortType, // 全局变量
    };
  }

  render() {
    return (
      <Container
        columns={this.state.columns}
        filt={(filtType) => {
          fetch(`./data?sort=${this.state.sortType}&filt=${filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                filtType: filtType,
              });
            });
        }}
        sort={(sortType) => {
          fetch(`./data?sort=${sortType}&filt=${this.state.filtType}`)
            .then((res) => res.json())
            .then((json) => {
              this.setState({
                columns: json,
                sortType: sortType,
              });
            });
        }}
      ></Container>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("reactapp"));
