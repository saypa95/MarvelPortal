import "./banner.scss";
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const Banner = () => {
  return (
    <div className="banner">
      <img className="banner__img" src={avengers} alt="Avengers" />
      <div className="banner__text">New comics every week! Stay tuned!</div>
      <img className="banner__logo" src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default Banner;
