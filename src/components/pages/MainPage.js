import { useState } from "react";
import { Helmet } from "react-helmet";

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import vision from "../../resources/img/vision.png";
import FindCharForm from "../findCharForm/FindCharForm";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information portal" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char-content" id="charContent">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className="char-content__sidebar">
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <FindCharForm onCharFinded={onCharSelected} />
        </div>
        <img className="char-content__decoration" src={vision} alt="vision" />
      </div>
    </>
  );
};

export default MainPage;
