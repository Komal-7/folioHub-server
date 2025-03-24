const { dynamoDB, TEMPLATES_TABLE } = require("../config/database");

const TemplateRepository = {
    async getGlobalTemplates() {
        const params = {
            TableName: TEMPLATES_TABLE,
            ProjectionExpression: "template_id, s3_preview, tags",
        };
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }
};

module.exports = TemplateRepository;
