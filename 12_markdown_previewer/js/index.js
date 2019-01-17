var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var App = function (_React$Component) {_inherits(App, _React$Component);
  function App(props) {_classCallCheck(this, App);var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this,
    props));
    _this.state = {
      markdown: 'markdown placeholder',
      previewText: '' };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.convertMarkdown = _this.convertMarkdown.bind(_this);return _this;
  }_createClass(App, [{ key: 'handleChange', value: function handleChange(
    event) {
      this.setState({ markdown: event.target.value });
      this.setState({ previewText: this.convertMarkdown(event.target.value) });
    } }, { key: 'convertMarkdown', value: function convertMarkdown(
    markdown) {
      return document.getElementById('preview').innerHTML =
      marked(markdown);
    } }, { key: 'render', value: function render()
    {
      return (
        React.createElement('div', null,
          React.createElement(Editor, { onChange: this.handleChange, markdown: this.state.markdown }),
          React.createElement(Preview, { markdown: this.state.previewText })));


    } }]);return App;}(React.Component);var


Editor = function (_React$Component2) {_inherits(Editor, _React$Component2);
  function Editor(props) {_classCallCheck(this, Editor);return _possibleConstructorReturn(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).call(this,
    props));
  }_createClass(Editor, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', null,
          React.createElement(ToolBar, { name: 'Markdown Editor' }),
          React.createElement('textarea', { id: 'editor', type: 'text', value: this.props.markdown, onChange: this.props.onChange })));


    } }]);return Editor;}(React.Component);var


Preview = function (_React$Component3) {_inherits(Preview, _React$Component3);
  function Preview(props) {_classCallCheck(this, Preview);return _possibleConstructorReturn(this, (Preview.__proto__ || Object.getPrototypeOf(Preview)).call(this,
    props));
  }_createClass(Preview, [{ key: 'render', value: function render()
    {
      return (
        React.createElement('div', null,
          React.createElement(ToolBar, { name: 'Document Preview' }),
          React.createElement('div', { id: 'preview' }, this.props.previewText)));


    } }]);return Preview;}(React.Component);


var ToolBar = function ToolBar(props) {
  return (
    React.createElement('div', null, props.name));

};

ReactDOM.render(React.createElement(App, null), document.getElementById('App'));