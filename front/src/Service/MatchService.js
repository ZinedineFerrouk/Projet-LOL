import axios from "axios";

/**
 * URL de base de l'api
 */
const baseUrl = "http://127.0.0.1:8000/api";

export const getSummonerById = (summonerId, regionId) => {
  return axios.get(
    baseUrl + "/get-matchs/summoner/" + summonerId + "/" + regionId
  );
};
