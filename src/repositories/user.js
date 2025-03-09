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
            Key: { email },
        };
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }
};

module.exports = UserRepository;
