import { Component } from "react";
import PropTypes from 'prop-types';
import MarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charInfo.scss";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) return;

    this.onCharLoading();

    this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError);
  };

  onCharLoaded = (char) => {
    this.setState({ char: char, loading: false, error: false });
  };

  onCharLoading = () => {
    this.setState({
      loading: true,
      error: false,
    });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = spinner || errorMessage || !char || <InfoView char={char} />;
    const skeleton =
      char || loading || error ? null : (
        <div className="char-info__skeleton">
          <p className="char-info__skeleton-title">Please select a character to see information</p>
          <Skeleton />
        </div>
      );

    return (
      <div className="char-info">
        {skeleton}
        {content}
      </div>
    );
  }
}

const InfoView = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comicsList } = char;
  return (
    <>
      <div className="char-info__header">
        <img className="char-info__img" src={thumbnail} alt="img" />
        <div className="char-info__links">
          <p className="char-info__name">{name}</p>
          <div className="char-info__btns">
            <a href={homepage} className="button">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button_grey">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>

      <div className="char-info__description">{description}</div>

      <div className="char-info__comics">
        <p className="char-info__comics-title">Comics:</p>
        <ul className="char-info__comics-list">
          {comicsList.map((comics, i) => {
            return (
              <li className="char-info__comics-item" key={i}>
                {comics.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
}

export default CharInfo;
