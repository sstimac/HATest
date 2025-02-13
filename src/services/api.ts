const BASE_ENDPOINT = 'https://staging.helloagain.at/api/v1/clients/5189/bounties';

const loadRewards = (limit = 20, page = 1) => {
  const resultEndpoint = `${BASE_ENDPOINT}?limit=${limit}&page=${page}`;

  return fetch(resultEndpoint).then(res => res.json());
};

const loadNextRewards = (nextLink: URL) => {
  return fetch(nextLink).then(res => res.json());
};

export default {
  loadRewards,
  loadNextRewards,
};
