const { dynamoDB, PROJECTS_TABLE } = require("../config/database");

const getDeployedProjectByUser = async (user_id) => {
    const params = {
        TableName: PROJECTS_TABLE,
        KeyConditionExpression: 'user_id = :uid',
        FilterExpression: 'is_deployed = :trueVal',
        ExpressionAttributeValues: {
            ':uid': user_id,
            ':trueVal': true,
        },
    };
    const result = await dynamoDB.query(params).promise();
    return result.Items.length ? result.Items[0] : null;
}
  
const ProjectRepository = {
    async getProjectById(user_id, project_id) {
        const params = {
            TableName: PROJECTS_TABLE,
            Key: {
                user_id,
                project_id
            }
        };
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    },
    async upsertProject(project) {
        const params = {
            TableName: PROJECTS_TABLE,
            Item: project,
        };
        await dynamoDB.put(params).promise();
        return;
    },
    async markDeployed(deployData) {
        const {user_id, s3Key, project_id} = deployData;
        // Step 1: Get currently deployed project
        const deployedProject = await getDeployedProjectByUser(user_id);
        // Step 2: Mark previously deployed project as not deployed (if exists)
        if (deployedProject) {
            const updateOldParams = {
                TableName: PROJECTS_TABLE,
                Key: {
                    user_id,
                    project_id: deployedProject.project_id,
                },
                UpdateExpression: 'SET is_deployed = :falseVal, deployed_url = :nullUrl',
                ExpressionAttributeValues: {
                    ':falseVal': false,
                    ':nullUrl': null,
                }
            };
            await dynamoDB.update(updateOldParams).promise();
        }

        // Step 3: Mark selected project as deployed
        const updateNewParams = {
            TableName: PROJECTS_TABLE,
            Key: {
                user_id,
                project_id,
            },
            UpdateExpression: 'SET is_deployed = :trueVal, deployed_url = :url',
            ExpressionAttributeValues: {
                ':trueVal': true,
                ':url': s3Key,
            },
        };
        await dynamoDB.update(updateNewParams).promise();
    }
};

module.exports = ProjectRepository;
