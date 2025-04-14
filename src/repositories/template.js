const { dynamoDB, TEMPLATES_TABLE } = require("../config/database");

const TemplateRepository = {
    async getGlobalTemplates() {
        const params = {
            TableName: TEMPLATES_TABLE,
            ProjectionExpression: "template_id, s3_preview, tags",
        };
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    },
    async getTemplateById(templateId) {
        const params = {
            TableName: TEMPLATES_TABLE,
            Key: {
                template_id: templateId
            }
        };
    
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }
};

module.exports = TemplateRepository;
