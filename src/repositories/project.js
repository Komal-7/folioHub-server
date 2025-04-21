const { dynamoDB, PROJECTS_TABLE } = require("../config/database");

const ProjectRepository = {
    async upsertProject(project) {
        const params = {
            TableName: PROJECTS_TABLE,
            Item: project,
        };
        await dynamoDB.put(params).promise();
        return;
    }
};

module.exports = ProjectRepository;
