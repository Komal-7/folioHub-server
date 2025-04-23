const { uploadAssestsToS3 } = require("../middlewares/s3");

const AssetsService = {
    async uploadAssets(user_id,files) {
        return await uploadAssestsToS3(user_id,files);
    }
};

module.exports = AssetsService;
