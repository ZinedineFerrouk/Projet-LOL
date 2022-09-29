import axios from "axios";

/**
 * URL de base de l'api
 */
const baseUrl = "http://127.0.0.1:8000/api";

export const getSummonerByName = (name) => {
  return axios.get(
    baseUrl + "/get-summoner/" + name
  );
};

export const getMatchsBySummonerName = (summonerName, regionId) => {
  return axios.get(
    baseUrl + "/get-matchs/summoner/" + summonerName + "/" + regionId
  );
};

export const getMatchTimeline = (match_id) => {
  return axios.get(
    baseUrl + "/get-match-timeline/" + match_id
  );
};
