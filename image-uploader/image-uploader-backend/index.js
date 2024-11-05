require('dotenv').config();
const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

AWS.config.update({ 
  region: process.env.AWS_REGION, 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY 
});

const s3 = new AWS.S3();
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded.');
  }

  const bucketName = process.env.S3_BUCKET_NAME;
  const originalImageKey = `original/${file.filename}-${file.originalname}`;

  try {
    const uploadResult = await s3.upload({
      Bucket: bucketName,
      Key: originalImageKey,
      Body: fs.createReadStream(file.path),
      ACL: 'public-read'
    }).promise();

    res.json({
      originalImageUrl: uploadResult.Location,
      resizedImageUrl: 'placeholder-resized-url'
    });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    res.status(500).send('Failed to upload image to S3');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
