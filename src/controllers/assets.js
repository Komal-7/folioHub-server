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
    },
    async loadAssets(req,res) {
        try {
            const user_id = req.user.user_id;
            const assets = await AssetsService.loadAssets(user_id);
            res.status(200).json({ assets });
          } catch (error) {
            console.error('Error loading assets:', error);
            res.status(500).json({ error: 'Failed to load assets' });
          }
    },
    async deleteAssets(req,res) {
        try {
            const user_id = req.user.user_id;
            const assets = req.body.assets;
            await AssetsService.deleteAssets(user_id, assets);
            res.status(204).end();
          } catch (error) {
            console.error('Error deleting assets:', error);
            res.status(500).json({ error: 'Failed to delete assets' });
          }
    }
};

module.exports = AssetsController;
