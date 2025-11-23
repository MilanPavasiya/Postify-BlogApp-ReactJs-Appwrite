# Postify — Full-Stack Blogging App

> **Quick summary:** Postify is a production-oriented blogging app using **React (Vite)** frontend, **Appwrite** for authentication + database, and **AWS S3** exclusively for file storage (images). The app's backend (Node/Express) acts mainly as a secure S3 upload proxy and small API layer; all media URLs are saved into Appwrite database records.

---

## Table of contents

1. [What this repo contains](#what-this-repo-contains)
2. [High-level architecture](#high-level-architecture)
3. [Prerequisites](#prerequisites)
4. [Local setup — step by step](#local-setup--step-by-step)

   - Frontend
   - Backend

5. [Environment variables (`.env`) — frontend & backend examples](#environment-variables-env)
6. [Packages / dependencies](#packages--dependencies)
7. [Appwrite configuration (Auth + DB + CORS)](#appwrite-configuration-auth--db--cors)
8. [AWS S3 configuration (bucket, CORS, IAM)](#aws-s3-configuration)
9. [TinyMCE integration notes](#tinymce-integration-notes)
10. [How file upload flow works (S3 + Appwrite)](#how-file-upload-flow-works)
11. [CORS troubleshooting & tips](#CORS-troubleshooting)
12. [Deployment notes](#deployment-notes)
13. [Common problems & fixes](#common-problems--fixes)
14. [Contributing](#contributing)

---

## What this repo contains

- `frontend/` — React (Vite) SPA with TinyMCE, Appwrite SDK integration for auth and DB operations, and API calls to backend for image uploads.
- `backend/` — Node.js + Express microservice that:

  - securely receives multipart image uploads from frontend,
  - uploads images to AWS S3 using server-side AWS credentials,
  - returns the public S3 URL (or signed URL) to the frontend (which then writes metadata / url to Appwrite DB).

- `README.md` — (this file)

> **Note:** Appwrite is used for Authentication (users/sessions) and as the primary database where post documents live. Appwrite storage is _not_ used for images — S3 is the single source for binary/image assets.

---

## High-level architecture

1. User interacts with React frontend.
2. Frontend uses Appwrite SDK for signup/login and to read/write post documents (title, body HTML, image URL, authorId, timestamps).
3. For image upload, frontend sends file to backend endpoint `/api/upload`.
4. Backend uploads file to AWS S3 and returns the file URL.
5. Frontend receives the URL and saves it in Appwrite as part of the post document.

---

## Prerequisites

- Node.js (v18+)
- npm or yarn
- An Appwrite project:

  - Website: [https://appwrite.io](https://appwrite.io)

- AWS account with S3 and IAM
- Optional: Ngrok for webhook testing

---

## Local setup — step by step

### Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend default URL:
`http://localhost:4000`

---

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend default URL:
`http://localhost:5173`

---

## Environment variables (`.env`)

### Backend example

```
PORT=4000
EXPIRE_SECONDS=300

# AWS
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=xxxxxx
AWS_REGION=us-east-1
AWS_S3_BUCKET=postify-media-bucket
```

### Frontend example (`VITE_` required)

```
VITE_APPWRITE_URL='https://cloud.appwrite.io/v1'
VITE_APPWRITE_PROJECT_ID='your_project_id'
VITE_APPWRITE_DATABASE_ID='your_db_id'
VITE_APPWRITE_COLLECTION_ID='your_collection_id'
VITE_TINYMCE_API_KEY='your_tinymce_api_key'
VITE_API_BASE_URL='http://localhost:4000'
```

> Vite only exposes variables prefixed with `VITE_`.

---

## Packages / dependencies

Check the respective package.json files:

- Backend:
  `backend/package.json`
- Frontend:
  `frontend/package.json`

---

## Appwrite configuration (Auth + DB + CORS)

Add your domain(s) in Appwrite:

- Appwrite dashboard
- Project → Settings → CORS

Example configuration:

```json
{
	"allowedOrigins": [
		"http://localhost:5173",
		"https://your-production-domain.com"
	]
}
```

---

## AWS S3 configuration

### 1) CORS Configuration

S3 → Bucket → Permissions → CORS

Add Bucket Policy:

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "PublicReadGetObject",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::postify-bucket-name/*"
		}
	]
}
```

CORS Policy

```json
[
	{
		"AllowedHeaders": ["*"],
		"AllowedMethods": ["PUT", "GET", "POST"],
		"AllowedOrigins": [
			"http://localhost:5173",
			"Your-frontend-app-url-after-deployment"
		],
		"ExposeHeaders": ["ETag"],
		"MaxAgeSeconds": 3000
	}
]
```

### 2) IAM minimal policy

```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Effect": "Allow",
			"Action": [
				"s3:PutObject",
				"s3:GetObject",
				"s3:DeleteObject",
				"s3:ListBucket"
			],
			"Resource": [
				"arn:aws:s3:::postify-media-bucket",
				"arn:aws:s3:::postify-media-bucket/*"
			]
		}
	]
}
```

---

## TinyMCE integration notes

```bash
npm i @tinymce/tinymce-react
```

Example:

```jsx
import { Editor } from '@tinymce/tinymce-react';

<Editor
  apiKey={import.meta.env.VITE_TINYMCE_KEY}
  init={{
    height: 400,
    plugins: [...],
    toolbar: 'undo redo | formatselect | bold italic ...'
  }}
  value={content}
  onEditorChange={(value) => setContent(value)}
/>;
```

---

## How file upload flow works

1. User selects file
2. Frontend sends `POST /api/upload`
3. Backend uploads to S3
4. Backend returns file URL
5. Frontend stores URL into Appwrite post document

---

## CORS troubleshooting

Common fixes:

- Add exact domain and port in Appwrite CORS
- S3 must also include frontend origin
- Backend must respond to `OPTIONS` preflight
- If using cookies, ensure `credentials: "include"`

---

## Deployment notes

### Frontend

Deploy on platforms like:

- Netlify
- Vercel

Set environment variables in their dashboards.

### Backend

Deploy on:

- Render
- Railway
- EC2

Ensure secrets (AWS keys, Appwrite API URLs) are stored securely.

---

## Common problems & fixes

- **Vite `.env` not loading**
  Prefix with `VITE_` and restart dev server.

- **Images broken**
  S3 may be private — use signed URLs or set correct public ACL.

- **CORS errors**
  Remember:

  - Appwrite
  - S3
  - Backend
    all must allow origin.

---

## Contributing

- Fork repository
- Create a branch:

```bash
git checkout -b feature/your-feature
```

- Commit and push
- Open a pull request describing your changes
