const React = require("react");

module.exports = {
  __esModule: true,
  default: React.forwardRef((props, ref) => {
    return React.createElement("svg", { ...props, ref, testID: props.testID || "svg-mock" });
  }),
  ReactComponent: React.forwardRef((props, ref) => {
    return React.createElement("svg", { ...props, ref, testID: props.testID || "svg-mock" });
  }),
};
