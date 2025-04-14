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
    }
};

module.exports = UserRepository;
