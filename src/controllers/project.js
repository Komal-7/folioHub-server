const ProjectService = require("../services/project");

const ProjectController = {
    async saveProject(req,res) {
        try {
            const { project_json, project_id } = req.body;
            const user_id = req.user.user_id;
            const result = await ProjectService.saveOrUpdateProject({
              user_id,
              project_json,
              project_id
            });
        
            res.status(200).json(result);
        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ProjectController;
