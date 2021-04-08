import Header from "../components/Header";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor,
  };
};

export default connect(mapStateToProps)(Header);
