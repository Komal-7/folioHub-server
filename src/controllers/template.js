const TemplateService = require("../services/template");

const TemplateController = {
    async getTemplates(req,res) {
        try {
            const templates = await TemplateService.globalTemplates();
            res.status(200).json({ templates: templates });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = TemplateController;
