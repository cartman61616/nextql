import aws from 'aws-sdk'

export default async function handler(req, res) {
    try {
        // 1.
        const s3 = new aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
        })

        // 2.
        aws.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: process.env.AWS_REGION,
            signatureVersion: 'v4',
        })

        // 3.
        const post = await s3.createPresignedPost({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Fields: {
                key: req.query.file,
            },
            Expires: 60, // seconds
            Conditions: [
                ['content-length-range', 0, 5048576]
            ],
        })

        // 4.
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
    }
}