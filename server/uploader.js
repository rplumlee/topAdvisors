import cloudinary from 'cloudinary';

/**
 * Initializes the Logger with credentials passed in the config object
 * @param {object} context - server application context
 */
export default function (context) {

  var config = {};
  config.cloud_name = process.env.CLOUDINARY_CLOUD_NAME || Meteor.settings.CLOUDINARY_CLOUD_NAME;
  config.api_key = process.env.CLOUDINARY_API_KEY || Meteor.settings.CLOUDINARY_API_KEY;
  config.api_secret = process.env.CLOUDINARY_API_SECRET || Meteor.settings.CLOUDINARY_API_SECRET;

  cloudinary.config(config);

  context.Uploader = cloudinary.uploader;
}
