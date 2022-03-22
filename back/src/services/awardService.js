import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { SubrecordService } from "./BaseService";
import { Logger, LOGDIR, DEFAULT_LOG } from "../utils/logging";

class AwardService extends SubrecordService {
    // Inherit from BaseService
    Model = Award;

    // deletable = true;

    requiredFields = Object.freeze(["id", "user_id", "title"]);
    optionalFields = Object.freeze(["description"]);
    settableFields = Object.freeze(["title", "description"]);
    // uniqueFields = Object.freeze([]);
    // searchableFields = Object.freeze([]);

    // authField = "user_id";
    // refFields = Object.freeze({});

    allFields = Object.freeze([...this.requiredFields, ...this.optionalFields]);

    // logger;

    // Inherit from SubrecordService
    // ownerField = "user_id";

    // Here we override some methods to reduce degree of freedom.
    // Too many choices can be bad if the routers get funny ideas.
    // Freedom is very expensive indeed.

    async get({ id }) {
        return super.get({ id });
    }

    async del({ id, currentUserId }) {
        return super.del({ id, currentUserId });
    }

    async getParent({ id }) {
        return super.getParent({ id });
    }
}

const logger = new Logger({
    name_: "awardService",
    tee: [DEFAULT_LOG, Logger.resolvePaths(LOGDIR, "awardservice.log")],
});

const awardService = new AwardService({ logger });

export { awardService };
