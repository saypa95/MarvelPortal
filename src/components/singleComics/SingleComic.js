import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import "./singleComic.scss";

const SingleComic = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);

  const { getComic, loading, error, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [comicId]);

  const updateChar = () => {
    clearError();
    getComic(comicId).then(onComicLoaded);
  };

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = spinner || errorMessage || !comic || <ComicView comic={comic} />;

  return <div className="single-comics">{content}</div>;
};

const ComicView = ({ comic }) => {
  const {title, description, pageCount, thumbnail, language, price} = comic;
  
  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} comic book`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={title} className="single-comics__img" />
      <div className="single-comics__info">
        <h2 className="single-comics__name">{title}</h2>
        <p className="single-comics__descr">
        {description}
        </p>
        <p className="single-comics__descr">{pageCount}</p>
        <p className="single-comics__descr">Language: {language}</p>
        <div className="single-comics__price">{price}</div>
      </div>
      <Link to="../MarvelPortal/comics" className="single-comics__back">
        Back to all
      </Link>
    </>
  );
};

export default SingleComic;
