/**
 * Utils Service
 */
export default class UtilsService {
	/**
	 * Convert milliseconds into seconds
	 *
	 * @param {int} milliseconds
	 * @returns time in seconds
	 */
	millisToSeconds(milliseconds) {
		let seconds = milliseconds / 1000;
		return seconds;
	}

	/**
	 * Convert milliseconds into minutes
	 *
	 * @param {int} milliseconds
	 * @returns time in minutes
	 */
	millisToMinutes(milliseconds) {
		let minutes = Math.floor((milliseconds / 1000 / 60) % 60);

		if (minutes < 10) {
			minutes = "0" + minutes;
		}

		return minutes;
	}

	millisToMinutesAndSeconds(millis) {
		let minutes = Math.floor(millis / 60000);
		let seconds = Math.floor(((millis % 60000) / 1000));

		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}
}
