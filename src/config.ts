require('dotenv').config();

export default {
  port: +process.env.PORT || 8000,

  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    s3BucketName: process.env.AWS_S3_BUCKET_NAME,
  },

  basicAuth: {
    user: process.env.HTTP_BASIC_USER,
    pass: process.env.HTTP_BASIC_PASS,
  },

  prefix: process.env.PREFIX,

  queueHost: process.env.QUEUE_HOST,
  queuePort: process.env.QUEUE_PORT,
};
