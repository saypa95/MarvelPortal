import { Component } from "react";
import Spinner from "../spinner/Spinner";
import MarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

class RandomChar extends Component {
  state = {
    char: {},
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false, error: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true, 
      error: false });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  updateChar = () => {
    this.onCharLoading();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService.getCharacter(id).then(this.onCharLoaded).catch(this.onError);
  };

  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = spinner || errorMessage || <CharView char={char} />;

    return (
      <div className="random-char">
        <div className="random-char__dynamic">{content}</div>
        <div className="random-char__static">
          <p className="random-char__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="random-char__title">Or choose another one</p>
          <button className="button" onClick={this.updateChar}>
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="random-char__decoration" />
        </div>
      </div>
    );
  }
}

const CharView = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <>
      <img src={thumbnail} alt="Random character" className="random-char__img" />
      <div className="random-char__info">
        <p className="random-char__name">{name}</p>
        <p className="random-char__decription">{description}</p>
        <div className="random-char__buttons">
          <a href={homepage} className="button">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button_grey">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RandomChar;
