import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

/** Static container class for services related to awards.
 *
 * @class
 * @method static async addAward({ title, description, awardee })
 * @method static async getAward({ title })
 * @method static async getAllAwards()
 * @method static async getUserAwards({ user })
 * @method static async searchAwards({ title, description })
 * @method static async setAward({ award_id, toUpdate })
 * @method static async removeAward({ award_id })
 */
class awardService {
    /** Add an award to the user.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} payload.title
     * @param {String} [payload.description]
     * @param {user} payload.awardee
     * @returns {award} added
     */
    static async addAward({ title, description, awardee }) {
        // Unlike user email, awards MAY have same name.

        const id = uuidv4();
        const newAward = { id, title, description, awardee };

        const added = await Award.create(newAward);
        return added;
    }

    /** Find the first award that exactly matches the title.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} payload.title - Must be an exact match.
     * @returns {award|null} found - If not found, just null.
     *  It will not emit error message.
     */
    static async getAward({ title }) {
        const found = await Award.findByName({ title });
        return found;
    }

    /** Find every last award there is.
     *
     * @static
     * @async
     * @returns {[award]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    static async getAllAwards() {
        const found = await Award.findAll();
        return found;
    }

    /** Find all awards given to the user.
     *
     * @static
     * @async
     * @returns {[award]} found - If none, return an empty Array.
     *  It will not emit error message.
     */
    static async getUserAwards({ user }) {
        const found = await Award.searchByAwardee({ user_id: user.id });
        return found;
    }

    /** Search awards with title/desc keywords.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {String} [payload.title]
     * @param {String} [payload.description]
     * @returns {[award]} found, or an empty Array.
     *
     * @todo We're not implementing this until regex escaping can be done.
     */
    static async searchAwards({ title, description }) {
        return [];
    }

    /** Modify an award.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.award_id
     * @param {Object} payload.toUpdate
     * @param {field} payload.toUpdate.fieldToUpdate
     * @param {any} payload.toUpdate.newValue
     * @returns {award} updated
     */
    static async setAward({ award_id, toUpdate }) {
        const { fieldToUpdate, newValue } = toUpdate;
        const updated = await Award.update({
            award_id,
            fieldToUpdate,
            newValue,
        });
        return updated;
    }

    /** Remove an award.
     *
     * @static
     * @async
     * @param {Object} payload
     * @param {uuid} payload.award_id
     * @returns {award} removed
     */
    static async removeAward({ award_id }) {
        const removed = await Award.delete({ award_id });
        return removed;
    }
}

export { awardService };
