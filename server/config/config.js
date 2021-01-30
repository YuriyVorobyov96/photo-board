module.exports = {
  MongoUser: process.env.MONGODB_USER,
  MongoPassword: process.env.MONGODB_PASSWORD,
  MongoConnectionString: process.env.MONGODB_CONNECTION_STRING,

  ImaggaAuthToken: process.env.IMAGGA_AUTH_TOKEN,
  ImaggaApiKey: process.env.IMAGGA_API_KEY,
  ImaggaApiSecret: process.env.IMAGGA_API_SECRET,
  ImaggaTagsUrl: 'https://api.imagga.com/v2/tags?image_url=',
};
