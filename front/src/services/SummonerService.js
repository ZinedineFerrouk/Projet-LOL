import axios from "axios";

const URL = process.env.REACT_APP_BASE_URL;

/**
 * Summoner Service
 */
export default class SummonerService {
    
    /**
     * Get one summoner by this name
     * 
     * @param {string} name The name of the summoner
     * @returns
     */
    getOneByName(name) {
        return axios.get(`${URL}/get-summoner/${name}`, {
            headers: {
                'Access-Control-Allow-Origin' : '*'
            }
          });
    }

}
