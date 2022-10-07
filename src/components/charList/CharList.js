import { Component } from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 0,
    charsEnded: false,
  };

  cardRefs = [];

  setRef = (card) => {
    this.cardRefs.push(card);
  };

  toggleActiveCard = (id) => {
    this.cardRefs.forEach(item => item.classList.remove('char-card_selected'));
    this.cardRefs[id].classList.add('char-card_selected');
  }

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({ newItemsLoading: true });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemsLoading: false,
      offset: offset + 9,
      charsEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderList = (data) => {
    return data.map((char, i) => {
      return (
        <a href="#charContent" key={char.id} ref={this.setRef}>
          <div className="char-card" 
          onClick={() => {
            this.props.onCharSelected(char.id); 
            this.toggleActiveCard(i);
          }}>
            <img src={char.thumbnail} alt="charImg" />
            <div className="char-card__name">{char.name}</div>
          </div>
        </a>
      );
    });
  };

  render() {
    const { charList, loading, error, newItemsLoading, offset, charsEnded } = this.state;

    const list = this.renderList(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = spinner || errorMessage || list;

    return (
      <div className="char-list">
        <div className="char-list_wrapper">{content}</div>
        <button
          className="button button_long"
          onClick={() => this.onRequest(offset)}
          disabled={newItemsLoading}
          style={{ display: charsEnded ? "none" : "block" }}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
