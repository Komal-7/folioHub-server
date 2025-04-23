const { uploadAssestsToS3, getAssetsFromS3, deleteAssetsFromS3 } = require("../middlewares/s3");

const AssetsService = {
    async uploadAssets(user_id,files) {
        return await uploadAssestsToS3(user_id,files);
    },
    async loadAssets(user_id) {
        return await getAssetsFromS3(user_id);
    },
    async deleteAssets(user_id, assets) {
        return await deleteAssetsFromS3(user_id, assets);
    }
};

module.exports = AssetsService;
