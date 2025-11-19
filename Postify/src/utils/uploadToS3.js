export const uploadToS3 = async (file) => {
	try {
		const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
		
		console.log('Starting S3 upload...', { 
			filename: file.name, 
			contentType: file.type,
			apiBaseUrl,
			apiBaseUrlType: typeof apiBaseUrl,
			allEnvVars: Object.keys(import.meta.env).filter(k => k.startsWith('VITE_'))
		});

		// Check if apiBaseUrl is missing or invalid
		if (!apiBaseUrl || apiBaseUrl === 'undefined' || apiBaseUrl === 'http://localhost:5173') {
			const errorMsg = 'VITE_API_BASE_URL is not configured correctly!\n\nCurrent value: ' + apiBaseUrl + '\n\nPlease:\n1. Check Postify/.env file exists\n2. Verify it contains: VITE_API_BASE_URL=http://localhost:4000\n3. RESTART the frontend dev server (stop with Ctrl+C, then run: npm run dev)\n\nVite only reads .env files on startup!';
			console.error(errorMsg);
			console.error('Full env object:', import.meta.env);
			alert(errorMsg);
			return null;
		}

		// STEP 1: GET PRESIGNED URL FROM BACKEND
		console.log('Requesting presigned URL from:', `${apiBaseUrl}/api/s3/presign`);
		const res = await fetch(
			`${apiBaseUrl}/api/s3/presign`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					filename: file.name,
					contentType: file.type,
				}),
			}
		);

		console.log('Backend response status:', res.status);

		if (!res.ok) {
			const errorText = await res.text();
			console.error(`Backend error (${res.status}):`, errorText);
			alert(`Failed to get presigned URL: ${res.status} ${res.statusText}. Check console for details.`);
			return null;
		}

		const data = await res.json();
		console.log('Received presigned URL data:', { 
			hasUploadUrl: !!data.uploadUrl, 
			hasPublicUrl: !!data.publicUrl 
		});

		const { uploadUrl, publicUrl } = data;

		if (!uploadUrl || !publicUrl) {
			console.error('Invalid response from backend:', data);
			alert('Invalid response from backend. Check console for details.');
			return null;
		}

		// STEP 2: UPLOAD FILE TO S3 USING PRESIGNED URL
		console.log('Uploading file to S3...');
		const uploadRes = await fetch(uploadUrl, {
			method: 'PUT',
			headers: { 'Content-Type': file.type },
			body: file,
		});

		console.log('S3 upload response status:', uploadRes.status);

		if (!uploadRes.ok) {
			const errorText = await uploadRes.text().catch(() => 'Unable to read error response');
			console.error(`S3 upload failed (${uploadRes.status}):`, errorText);
			alert(`Failed to upload to S3: ${uploadRes.status}. Check console for details.`);
			return null;
		}

		// STEP 3: RETURN PUBLIC URL TO SAVE IN APPWRITE
		console.log('Upload successful! Public URL:', publicUrl);
		return publicUrl;
	} catch (error) {
		console.error('S3 upload failed with exception:', error);
		alert(`Image upload failed: ${error.message}. Check browser console for details.`);
		return null;
	}
};
