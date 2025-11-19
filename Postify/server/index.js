require('dotenv').config();
const express = require('express');
const {
	S3Client,
	PutObjectCommand,
	GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.S3_BUCKET_NAME;
const EXPIRE_SECONDS = parseInt(process.env.EXPIRE_SECONDS || '300', 10);

const s3 = new S3Client({
	region: REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
});

app.post('/api/s3/presign', async (req, res) => {
	try {
		const { filename, contentType } = req.body;
		if (!filename || !contentType)
			return res
				.status(400)
				.json({ error: 'filename and contentType required' });

		const key = `uploads/${Date.now()}-${filename}`;

		const command = new PutObjectCommand({
			Bucket: BUCKET,
			Key: key,
			ContentType: contentType,
		});

		const signedUrl = await getSignedUrl(s3, command, {
			expiresIn: EXPIRE_SECONDS,
		});

		// Public URL - ensure bucket policy allows public read access
		const publicUrl = `https://${BUCKET}.s3.${REGION}.amazonaws.com/${key}`;

		return res.json({ uploadUrl: signedUrl, key, publicUrl });
	} catch (err) {
		console.error('Presign error', err);
		return res.status(500).json({ error: 'Could not create presigned url' });
	}
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`S3 presign server running on ${PORT}`);
});
