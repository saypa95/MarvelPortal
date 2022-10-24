import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(100);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, loading, error } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllComics(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = (newComicsList) => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setNewItemsLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  const renderList = (data) => {
    return data.map((comics, i) => {
      return (
        <div className="comics-card" key={i}>
          <Link to={`${comics.id}`}>
            <img src={comics.thumbnail} alt="comics-img" className="comics-card__img" />
            <div className="comics-card__name">{comics.title}</div>
            <div className="comics-card__price">{`${comics.price}$`}</div>
          </Link>
        </div>
      );
    });
  };

  const list = renderList(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemsLoading ? <Spinner /> : null;
  const content = spinner || errorMessage || list;

  return (
    <div className="comics-list">
      <div className="comics-card-wrapper">{content}</div>

      <button
        className="button button_long"
        onClick={() => onRequest(offset)}
        disabled={newItemsLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
