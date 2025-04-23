const path = require('path');
const { v4: uuidv4 } = require("uuid");
const AWS = require("aws-sdk");
const { BUCKET_NAME, PROJECT_BUCKET, USER_DEPLOYMENT, USER_ASSETS } = require("../config/database");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

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

const uploadProjectHtmlToS3 = async (key,data) => {
  const params = {
    Bucket: USER_DEPLOYMENT,
    Key: key,
    Body: data,
    ContentType: "text/html",
  };

  await s3.putObject(params).promise();
};

const getHtmlFromS3 = async (sitename) => {
  const params = {
    Bucket: USER_DEPLOYMENT,
    Key: `${sitename}.html`,
  };
  
  const data = await s3.getObject(params).promise();
  return data.Body.toString('utf-8');
};

const uploadAssestsToS3 = async (user_id,files) => {
  const uploadedAssets = [];

  for (const file of files) {
    const file_id = uuidv4()
    const filename = `${path.basename(file.originalname,path.extname(file.originalname))}@${file_id}${path.extname(file.originalname)}`;
    const s3Key = `${user_id}/${filename}`;

    const uploadParams = {
      Bucket: USER_ASSETS,
      Key: s3Key,
      Body: file.buffer,
      ContentType: file.mimetype
    };

    await s3.putObject(uploadParams).promise();

    uploadedAssets.push({
      id: file_id,
      src: `https://${USER_ASSETS}.s3.amazonaws.com/${s3Key}`,
      name: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
    });
  }

  return uploadedAssets;
};

const getAssetsFromS3 = async(user_id) => {
  const params = {
    Bucket: USER_ASSETS,
    Prefix: `${user_id}/`,
  };

  const listedObjects = await s3.listObjectsV2(params).promise();

  const assets = listedObjects.Contents.map((obj) => {
    const key = obj.Key;
    const url = `https://${USER_ASSETS}.s3.amazonaws.com/${key}`;
    const name = key.split('/').pop();
    return {
      src: url,
      name,
      // size: obj.Size,
      // mimeType is optional unless needed
    };
  });

  return assets;
};

const deleteAssetsFromS3 = async(user_id,assets) => {
  const objectsToDelete = assets.map((asset) => ({
    Key: `${user_id}/${asset.name}`
  }));

  const params = {
    Bucket: USER_ASSETS,
    Delete: { Objects: objectsToDelete }
  };

  await s3.deleteObjects(params).promise();
};

module.exports = {generateSignedUrl, 
                  uploadProjectJsonToS3, 
                  uploadProjectHtmlToS3, 
                  getHtmlFromS3, 
                  uploadAssestsToS3, 
                  getAssetsFromS3,
                  deleteAssetsFromS3
                };