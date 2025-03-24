const AWS = require('aws-sdk')

require("dotenv").config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
  
const USERS_TABLE = "Users";
const TEMPLATES_TABLE = "templates";

const BUCKET_NAME = "foliohub-templates";

module.exports = { dynamoDB, USERS_TABLE, TEMPLATES_TABLE, BUCKET_NAME }   