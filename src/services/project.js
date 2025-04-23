const ProjectRepository = require("../repositories/project");
const { v4: uuidv4 } = require("uuid");
const { uploadProjectJsonToS3, uploadProjectHtmlToS3 } = require("../middlewares/s3");
const ProjectService = {
    async saveOrUpdateProject(projectData) {
        const { user_id, project_json, project_id } = projectData;
        const isNew = !project_id;
        const finalProjectId = isNew ? uuidv4() : project_id;
        const objectKey = `${user_id}/${finalProjectId}.json`;

        // Upload to S3
        await uploadProjectJsonToS3(objectKey, project_json);
        
        let isDeployed = false;
        let deployedUrl = null;

        // If updating existing project, fetch current values
        if (!isNew) {
            const existingProject = await ProjectRepository.getProjectById(user_id, project_id);
            if (existingProject && existingProject.is_deployed) {
                isDeployed = true;
                deployedUrl = existingProject.deployed_url;
            }
        }
        //remove this if project exists already
        // Save or overwrite in DynamoDB
        await ProjectRepository.upsertProject({
            user_id,
            project_id: finalProjectId,
            s3Key: objectKey,
            updatedAt: new Date().toISOString(),
            is_deployed: isDeployed,
            deployed_url: deployedUrl
        });

        return {
            message: isNew ? "Created new project" : "Updated project",
            project_id: finalProjectId
        };
    },
    async deployProject(deployData) {
        const { user_id, project_id, html, sitename } = deployData;
        const objectKey = `${sitename}.html`;

        // Upload to S3
        await uploadProjectHtmlToS3(objectKey, html);
        await ProjectRepository.markDeployed({user_id, s3Key: objectKey, project_id})
        return {
            message: 'Project deployed successfully',
        }
    }
};

module.exports = ProjectService;
