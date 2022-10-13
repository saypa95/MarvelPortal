import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [charsEnded, setCharsEnded] = useState(false);

  const {getAllCharacters, loading, error} = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 9);
    setCharsEnded(ended);
  };

  const cardRefs = useRef([]);

  const toggleActiveCard = (id) => {
    cardRefs.current.forEach((item) => item.classList.remove("char-card_selected"));
    cardRefs.current[id].classList.add("char-card_selected");
  };

  const renderList = (data) => {
    return data.map((char, i) => {
      return (
        <a href="#charContent" key={char.id} ref={(el) => (cardRefs.current[i] = el)}>
          <div
            className="char-card"
            onClick={() => {
              props.onCharSelected(char.id);
              toggleActiveCard(i);
            }}
          >
            <img src={char.thumbnail} alt="charImg" />
            <div className="char-card__name">{char.name}</div>
          </div>
        </a>
      );
    });
  };

  const list = renderList(charList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const content = spinner || errorMessage || list;

  return (
    <div className="char-list">
      <div className="char-list_wrapper">{content}</div>
      <button
        className="button button_long"
        onClick={() => onRequest(offset)}
        disabled={newItemsLoading}
        style={{ display: charsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
