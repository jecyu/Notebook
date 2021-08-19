const React = require("react");
const Container = require("../components/container");

module.exports = function(reactData) {
  return (
    <Container columns={reactData} filt={() => {}} sort={() => {}}></Container>
  );
};
