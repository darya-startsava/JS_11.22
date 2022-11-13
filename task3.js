class RickAndMorty {
  getCharacter(id) {
    if (typeof id !== 'number' || isNaN(id) || !isFinite(id)) {
      throw new Error('Invalid argument');
    }
    return fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return null;
        }
      })
      .catch((error) => {
        throw new Error('Fetch error', { cause: error });
      });
  }
  async getEpisode(id) {
    if (typeof id !== 'number' || isNaN(id) || !isFinite(id)) {
      throw new Error('Invalid argument');
    }
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode/${id}`
      );
      if (!response.ok) {
        return null;
      }
      const episode = await response.json();
      return episode;
    } catch (error) {
      throw new Error('Fetch error', { cause: error });
    }
  }
}
