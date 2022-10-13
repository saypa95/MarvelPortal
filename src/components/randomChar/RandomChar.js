import { useState, useEffect } from "react";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});

  const {getCharacter, loading, error, clearError} = useMarvelService();

  const onCharLoaded = (char) => {
    clearError();
    setChar(char);
  };

  const updateChar = () => {
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id).then(onCharLoaded)
  };

  useEffect(updateChar, []);

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
        <button className="button" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="random-char__decoration" />
      </div>
    </div>
  );
};

const CharView = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <>
      <img src={thumbnail} alt="Random character" className="random-char__img" />
      <div className="random-char__info">
        <p className="random-char__name">{name}</p>
        <p className="random-char__decription">{description}</p>
        <div className="random-char__buttons">
          <a href={homepage} className="button" target="_blank" rel="noreferrer">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button_grey" target="_blank" rel="noreferrer">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </>
  );
};

export default RandomChar;
