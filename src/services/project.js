const ProjectRepository = require("../repositories/project");
const { v4: uuidv4 } = require("uuid");
const { uploadProjectJsonToS3 } = require("../middlewares/s3");
const ProjectService = {
    async saveOrUpdateProject(projectData) {
        const { user_id, project_json, project_id } = projectData;
        const isNew = !project_id;
        const finalProjectId = isNew ? uuidv4() : project_id;
        const objectKey = `${user_id}/${finalProjectId}.json`;

        // Upload to S3
        await uploadProjectJsonToS3(objectKey, project_json);
        
        // Save or overwrite in DynamoDB
        await ProjectRepository.upsertProject({
            user_id,
            project_id: finalProjectId,
            s3Key: objectKey,
            updatedAt: new Date().toISOString()
        });

        return {
            message: isNew ? "Created new project" : "Updated project",
            project_id: finalProjectId
        };
    }
};

module.exports = ProjectService;
