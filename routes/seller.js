const express = require('express');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid').v4;
const path = require('path');
const { sellCar, loginSeller } = require('../controllers/seller');
const router = express.Router();

const s3 = new aws.S3({ apiVersion: '2006-03-01' });
// Needs AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'trust-autosales',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, `${uuid()}${ext}`);
    },
  }),
});

router.route('/api/sell').post(upload.array('Photos'), sellCar);
router.route('/login').post(loginSeller);

module.exports = router;
