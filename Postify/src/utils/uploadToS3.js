export const uploadToS3 = async (file) => {
	try {
		const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

		if (!apiBaseUrl || apiBaseUrl === 'undefined') {
			console.error('VITE_API_BASE_URL is not defined.');
			return null;
		}

		const res = await fetch(`${apiBaseUrl}/api/s3/presign`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				filename: file.name,
				contentType: file.type,
			}),
		});

		if (!res.ok) {
			console.error(`Failed to get presigned URL. Status: ${res.status}`);
			return null;
		}

		const data = await res.json();
		const { uploadUrl, publicUrl } = data;

		if (!uploadUrl || !publicUrl) {
			console.error('Presigned URL response missing required fields.');
			return null;
		}

		const uploadRes = await fetch(uploadUrl, {
			method: 'PUT',
			headers: { 'Content-Type': file.type },
			body: file,
		});

		if (!uploadRes.ok) {
			console.error(`S3 file upload failed. Status: ${uploadRes.status}`);
			return null;
		}

		return publicUrl;
	} catch (error) {
		console.error('S3 upload error:', error);
		return null;
	}
};
