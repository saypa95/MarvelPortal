import useHttp from '../hooks/http.hook';

function useMarvelService() {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=3b7580081684b29906e841c03f5f42aa";
  const _baseOffset = 0;
  const _baseOffsetComics = 100;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getCharacterByName = async (name) => {
    const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
    return res.data.results.map(_transformCharacter);
  };

  const _cutDescription = (desc) => {
    if (desc.length === 0) {
      return "There is no description for this character";
    }

    if (desc.length > 210) {
      desc = desc.slice(0, 210) + "...";
    }

    return desc;
  };

  const _cutComicsList = (comicsList) => {
    if (comicsList.length === 0) {
      return [{ name: "There is no comics for this character" }];
    }

    if (comicsList.length > 10) {
      comicsList.length = 10;
    }
    return comicsList;
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: _cutDescription(char.description),
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comicsList: _cutComicsList(char.comics.items),
    };
  };

  const getAllComics = async (offset = _baseOffsetComics) => {
    const res = await request(`${_apiBase}comics?orderBy=-issueNumber&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformComics);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformComics(res.data.results[0]);
}

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'not available',
      pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
      language: comics.textObjects[0]?.language || 'en-us',
    };
  };

  return {getCharacterByName, getAllComics, getComic, getAllCharacters, getCharacter, loading, error, clearError};
}

export default useMarvelService;
