const AssetsService = require("../services/assets");

const AssetsController = {
    async uploadAssets(req,res) {
        try {
            const files = req.files;
            const user_id = req.user.user_id
            const result = await AssetsService.uploadAssets(user_id,files);
            res.status(200).json(result);
        } catch (err) {
            console.error('Asset Upload Error:', err);
            res.status(500).json({ message: 'Failed to upload assets' });
        }
    }
};

module.exports = AssetsController;
