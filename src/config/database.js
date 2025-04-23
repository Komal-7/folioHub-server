const AWS = require('aws-sdk')

require("dotenv").config();

const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
  
const USERS_TABLE = "Users";
const TEMPLATES_TABLE = "templates";
const PROJECTS_TABLE = "User_Projects"

const BUCKET_NAME = "foliohub-templates";
const PROJECT_BUCKET = "foliohub-user-projects"
const USER_DEPLOYMENT = "foliohub-user-deployments"

module.exports = { dynamoDB, USERS_TABLE, TEMPLATES_TABLE, BUCKET_NAME, PROJECT_BUCKET, PROJECTS_TABLE, USER_DEPLOYMENT }   