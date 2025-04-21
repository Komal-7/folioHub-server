const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const { BUCKET_NAME, PROJECT_BUCKET } = require("../config/database");


const generateSignedUrl = (objectKey) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectKey,
    Expires: 60 * 2
  };

  return s3.getSignedUrl("getObject", params);
};

const uploadProjectJsonToS3 = async (key, data) => {
  const params = {
    Bucket: PROJECT_BUCKET,
    Key: key,
    Body: JSON.stringify(data),
    ContentType: "application/json",
  };

  await s3.putObject(params).promise();
};

module.exports = {generateSignedUrl, uploadProjectJsonToS3};