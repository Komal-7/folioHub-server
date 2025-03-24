const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const { BUCKET_NAME } = require("../config/database");


const generateSignedUrl = (objectKey) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: objectKey,
    Expires: 60 * 60 * 24
  };

  return s3.getSignedUrl("getObject", params);
};
module.exports = generateSignedUrl;