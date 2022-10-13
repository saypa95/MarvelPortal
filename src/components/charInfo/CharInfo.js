import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Skeleton from "../skeleton/Skeleton";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charInfo.scss";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const {getCharacter, loading, error, clearError} = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) return;

    clearError();
    getCharacter(charId).then(onCharLoaded);
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

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
};

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
};

export default CharInfo;
