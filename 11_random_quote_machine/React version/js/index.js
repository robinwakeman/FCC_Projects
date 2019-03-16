class FactBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      factList: {},
      currentFact: {
        text: '',
        author: ''
      },
      error: null,
      isLoaded: false
    };
    this.getJSON = this.getJSON.bind(this);
    this.getRandomFact = this.getRandomFact.bind(this);
  }
  componentDidMount() {
   this.getJSON();
  }
  // Call the Cat Facts API and set state with JSON data retrieved
  getJSON() {
  fetch("https://gist.githubusercontent.com/robinwakeman/b57ef92f04fc9fc77ef0240cca8a6b29/raw/3dcbbc4ac796ea794c38da480dca5bcda10d8494/catfact-copy")
      .then(resp => resp.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            factList: result.all
          });
         },
        (error) => {
          this.setState({ error: error });
        }
      )
  }
  getRandomFact(){
    let numFacts = this.state.factList.length;
    let randomIndex = Math.floor(Math.random()*(numFacts+1));
    return this.state.factList[randomIndex];
  }
  render() {
    // This runs while factList is empty (before getJSON has completed), to make sure
    // that factList is loaded before we attempt to access its elements below in return(...).
    //
    // When getJSON is completed, the state is updated, which triggers FactBox to be re-rendered,
    // but this time factList is not empty, so the return(...) statement below is run instead of this one.
    if (Object.keys(this.state.factList).length == 0) {
      return "Loading..."
    }
    let currentFact = this.getRandomFact();

    return (
    <div>
      <div id={"cat-head"}>
        <div id={"quote-box"}>
          <div id={"text"}> {currentFact.text} </div>
          <div id={"author"}> {currentFact.user.name.first} </div>
          <div id={"buttons-box"}>
            <button> New Fact </button>
            <button> Tweet </button>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

const Button = function(props) {

}
ReactDOM.render(<FactBox />, document.getElementById('App'));