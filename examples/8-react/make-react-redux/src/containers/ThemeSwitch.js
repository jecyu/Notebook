import { connect } from "react-redux";
import ThemeSwitch from "../components/ThemeSwitch";

const mapStateProps = (state) => {
  return {
    themeColor: state.themeColor,
  };
};

const mapDispatchProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: "CHANGE_COLOR", themeColor: color });
    },
  };
};

export default connect(mapStateProps, mapDispatchProps)(ThemeSwitch);
