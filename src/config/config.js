const env = require('dotenv')
env.config()

module.exports = {
    BucketName: process.env.BUCKET_NAME || '',
    Endpoint: process.env.ENDPOINT || ''
}