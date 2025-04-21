const { dynamoDB, USERS_TABLE } = require("../config/database");

const UserRepository = {
    async createUser(user) {
        const params = {
            TableName: USERS_TABLE,
            Item: user,
        };
        await dynamoDB.put(params).promise();
        return;
    },

    async getUserByEmail(email) {
        const params = {
            TableName: USERS_TABLE,
            IndexName: "email-index",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
              ":email": email
            }
        };
        const result = await dynamoDB.query(params).promise();
        return result.Items?.[0];
    },
    async getUserById(user_id) {
        const params = {
            TableName: USERS_TABLE,
            Key: {
              user_id
            },
        };
    
        try {
            const result = await dynamoDB.get(params).promise();
            return result.Item; // null if not found
        } catch (error) {
            console.error("Error getting user:", error);
            throw error;
        }
    }
};

module.exports = UserRepository;
