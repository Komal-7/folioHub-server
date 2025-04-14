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
    },
    async templateById(templateId){
        const template = await TemplateRepository.getTemplateById(templateId);
        if (!template) throw new Error("Something went wrong, try again later");
        return {
            ...template,
            s3_html: generateSignedUrl(template.s3_html),
            s3_css: generateSignedUrl(template.s3_css),
        };
    }
};

module.exports = TemplateService;
