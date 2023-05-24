const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = "grub-globe-seeds";

const singleFileUpload = async ({ file }) => {
  const { originalname, buffer } = file;
  const path = require("path");

  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key: Key,
    Body: buffer
  };
  console.log(uploadParams)
  const result = await s3.upload(uploadParams).promise();
  console.log(result)
  return result.Location;
};

module.exports = {
  s3,
  singleFileUpload
};
