const ProjectService = require("../services/project");

const ProjectController = {
    async getAllProjects(req,res) {
        try {
            const user_id = req.user.user_id;
            const projects = await ProjectService.allProjects(user_id);
            res.status(200).json({ projects: projects });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async saveProject(req,res) {
        try {
            const { project_json, project_id, project_name } = req.body;
            const user_id = req.user.user_id;
            const result = await ProjectService.saveOrUpdateProject({
              user_id,
              project_json,
              project_id,
              project_name
            });
        
            res.status(200).json(result);
        } catch (error) {
            console.error("Controller Error:", error);
            res.status(500).json({ error: error.message });
        }
    },
    async deployProject(req,res) {
        const { project_id, html, sitename } = req.body;
        const user_id = req.user.user_id;
        try {
            const result = await ProjectService.deployProject({ user_id, project_id, html, sitename });
            res.status(200).json(result);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({ error: 'Failed to deploy project' });
        }
    }
};

module.exports = ProjectController;
