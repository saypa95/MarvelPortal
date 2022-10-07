import { Component } from "react";
import Header from "../header/Header";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import Banner from "../banner/Banner";
import SingleComics from "../singleComics/SingleComics";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import vision from "../../resources/img/vision.png";

class App extends Component {
  state = {
    selectedChar: null,
  };

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  render() {
    return (
      <div className="app">
        <Header />
        <main className="app__main">
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>

          {/* <Banner/> */}

          <div className="char-content" id="charContent">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected}/>
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundary>
            <img className="char-content__decoration" src={vision} alt="vision" />
          </div>

          {/* <ComicsList/> */}

          {/* <SingleComics/> */}
        </main>
      </div>
    );
  }
}

export default App;
