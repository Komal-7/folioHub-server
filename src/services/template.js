const TemplateRepository = require("../repositories/template");
const {generateSignedUrl} = require("../middlewares/s3");
const { BUCKET_NAME } = require("../config/database");

const TemplateService = {
    async globalTemplates(){
        const templates = await TemplateRepository.getGlobalTemplates();
        if (!templates) throw new Error("Something went wrong, try again later");
        return templates.map((template) => ({
            ...template,
            s3_preview: generateSignedUrl(BUCKET_NAME,template.s3_preview),
        }));
    },
    async templateById(templateId){
        const template = await TemplateRepository.getTemplateById(templateId);
        if (!template) throw new Error("Something went wrong, try again later");
        return {
            ...template,
            template_json: generateSignedUrl(BUCKET_NAME,template.template_json)
        };
    }
};

module.exports = TemplateService;
