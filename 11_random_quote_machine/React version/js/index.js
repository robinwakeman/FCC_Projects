var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var FactBox = function (_React$Component) {_inherits(FactBox, _React$Component);
  function FactBox(props) {_classCallCheck(this, FactBox);var _this = _possibleConstructorReturn(this, (FactBox.__proto__ || Object.getPrototypeOf(FactBox)).call(this,
    props));
    _this.state = {
      factList: {},
      currentFact: {
        text: '',
        author: '' },

      error: null,
      isLoaded: false };

    _this.getJSON = _this.getJSON.bind(_this);
    _this.getRandomFact = _this.getRandomFact.bind(_this);return _this;
  }_createClass(FactBox, [{ key: 'componentDidMount', value: function componentDidMount()
    {
      this.getJSON();
    }
    // Call the Cat Facts API and set state with JSON data retrieved
  }, { key: 'getJSON', value: function getJSON() {var _this2 = this;
      fetch("https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy").
      then(function (resp) {return resp.json();}).
      then(
      function (result) {
        _this2.setState({
          isLoaded: true,
          factList: result.all });

      },
      function (error) {
        _this2.setState({ error: error });
      });

    } }, { key: 'getRandomFact', value: function getRandomFact()
    {
      var numFacts = this.state.factList.length;
      var randomIndex = Math.floor(Math.random() * (numFacts + 1));
      return this.state.factList[randomIndex];
    } }, { key: 'render', value: function render()
    {
      // This runs while factList is empty (before getJSON has completed), to make sure 
      // that factList is loaded before we attempt to access its elements below in return(...).
      //
      // When getJSON is completed, the state is updated, which triggers FactBox to be re-rendered,
      // but this time factList is not empty, so the return(...) statement below is run instead of this one.
      if (Object.keys(this.state.factList).length == 0) {
        return "Loading...";
      }
      var currentFact = this.getRandomFact();

      return (
        React.createElement('div', null,
          React.createElement(FactDisplay, { fact: currentFact.text, author: currentFact.user.name.first })));


    } }]);return FactBox;}(React.Component);

var FactDisplay = function FactDisplay(props) {
  return (
    React.createElement('div', null,
      React.createElement('div', null, props.fact),
      React.createElement('div', null, props.author)));


};

var Button = function Button(props) {

};
ReactDOM.render(React.createElement(FactBox, null), document.getElementById('App'));