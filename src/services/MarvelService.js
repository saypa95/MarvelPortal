class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=3b7580081684b29906e841c03f5f42aa";
  _baseOffset = 0;
  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
    return res.data.results.map(this._transformCharacter);
  };

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  };

  _cutDescription = (desc) => {
    if (desc.length === 0) {
      return "There is no description for this character";
    }

    if (desc.length > 210) {
      desc = desc.slice(0, 210) + "...";
    }

    return desc;
  };

  _cutComicsList = (comicsList) => {
    if (comicsList.length === 0) {
      return [{ name: "There is no comics for this character" }];
    }

    if (comicsList.length > 10) {
      comicsList.length = 10;
    }
    return comicsList;
  };

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: this._cutDescription(char.description),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comicsList: this._cutComicsList(char.comics.items),
    };
  };
}

export default MarvelService;
