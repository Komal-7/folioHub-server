const TemplateRepository = require("../repositories/template");
const generateSignedUrl = require("../middlewares/generateSignedUrl");

const TemplateService = {
    async globalTemplates(){
        const templates = await TemplateRepository.getGlobalTemplates();
        if (!templates) throw new Error("Something went wrong, try again later");
        return templates.map((template) => ({
            ...template,
            s3_preview: generateSignedUrl(template.s3_preview),
        }));
    }
};

module.exports = TemplateService;
