import "./comicsList.scss";
import uw from '../../resources/img/UW.png';

const ComicsList = () => {
  return (
    <div className="comics-list">
      <div className="comics-card-wrapper">
        <div className="comics-card">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics-card__img" />
            <div className="comics-card__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics-card__price">9.99$</div>
          </a>
        </div>
        <div className="comics-card">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics-card__img" />
            <div className="comics-card__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics-card__price">9.99$</div>
          </a>
        </div>
        <div className="comics-card">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics-card__img" />
            <div className="comics-card__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics-card__price">9.99$</div>
          </a>
        </div>
        <div className="comics-card">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics-card__img" />
            <div className="comics-card__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics-card__price">9.99$</div>
          </a>
        </div>
        <div className="comics-card">
          <a href="#">
            <img src={uw} alt="ultimate war" className="comics-card__img" />
            <div className="comics-card__name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
            <div className="comics-card__price">9.99$</div>
          </a>
        </div>
      </div>

      <button className="button button_long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
