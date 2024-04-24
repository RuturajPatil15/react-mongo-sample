const express = require("express");
const Router = express.Router();
const ExpressFormidable = require("express-formidable");
const imageUploadController = require("../Controller/ImageUpload");

Router.post('/uploadImage',
ExpressFormidable({maxFieldsSize: 5 * 2024 * 2024}),
imageUploadController
);

module.exports = Router;