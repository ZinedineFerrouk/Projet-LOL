import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

/**
 * Match Service
 */
export default class MatchService {

  /**
   * Get all matchs by summoner name
   * 
   * @param {string} summonerName The summoner's name
   * @param {string} regionId The region's ID
   * @returns 
   */
  getAllBySummoner(summonerName, regionId) {
    return axios.get(`${URL}/get-matchs/summoner/${summonerName}/${regionId}`);
  }

  /**
   * 
   * @param {string} id The match's ID
   * @returns 
   */
  getAllDataFromOneGame(id) {
    return axios.get(`${URL}/get-match-details/${id}`);
  }

}
