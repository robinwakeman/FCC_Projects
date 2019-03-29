class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: "",
      previewText: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.convertMarkdown = this.convertMarkdown.bind(this);
  }
  handleChange(event) {
    this.setState({
      markdown: event.target.value,
      previewText: this.convertMarkdown(event.target.value)
    });
  }
  convertMarkdown(markdown) {
    return (document.getElementById("preview").innerHTML = marked(markdown, {breaks: true, gfm: true}));
  }
  componentDidMount() {
    let placeholderText = `# Type your markdown here!
> _Clear this placeholder text with ctrl-a + del_

__This previewer uses [Marked.js](https://marked.js.org/#/README.md), which supports these flavours of markdown:__
1. The original markdown.pl
1. [CommonMark](https://commonmark.org/help/)
1. [GitHub](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Use Marked in your own project:
Marked can be used in the browser, or applied to static files from the command line.
The easiest way to use it in the browser is:

__Include this script tag in the body of your page:__

\`\`\`
<script> src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"><\/script>
\`\`\`

__Now you can use the__ \`marked(String)\` __function to render the markup, like this:__

\` document.getElementById('content').innerHTML = marked('# Marked in browser'); \`

![Random Image](https://d1vki863cvir6c.cloudfront.net/uploads/topic/image/546/icon-only-200.png) ![Markdown Image](https://cdn.iconscout.com/icon/free/png-256/markdown-2-458334.png)`;

    this.setState({
      markdown: placeholderText,
      previewText: this.convertMarkdown(placeholderText)
    });
  }
  render() {
    return (
      <div className="row">
        <Editor
          column="col-md-6 editorContainer"
          onChange={this.handleChange}
          markdown={this.state.markdown}
        />
        <Preview
          className="previewContainer"
          column="col-md-6"
          markdown={this.state.previewText}
        />
      </div>
    );
  }
}

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.column}>
        <ToolBar name="Markdown Editor" />
        <textarea
          id="editor"
          type="text"
          value={this.props.markdown}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

class Preview extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.className}>
        <ToolBar name="Document Preview" />
        <div id="preview">{this.props.previewText}</div>
      </div>
    );
  }
}

const ToolBar = props => {
  return <div className="toolbar">{props.name}</div>;
};

ReactDOM.render(<App />, document.getElementById("App"));
