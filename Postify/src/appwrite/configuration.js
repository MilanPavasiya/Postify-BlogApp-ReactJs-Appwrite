import config from '../config/config.js';
import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class AppwriteService {
	client = new Client();
	databases;
	bucket;

	constructor() {
		this.client
			.setEndpoint(config.appwrite.url)
			.setProject(config.appwrite.projectId);
		this.databases = new Databases(this.client);
		this.bucket = new Storage(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.log('appwriteService createpost', error);
		}
	}

	async updatePost(slug, { title, content, featuredImage, status }) {
		try {
			return await this.databases.updateDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				slug,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.log('appwriteService updatepost :: ', error);
		}
	}

	async deletePost(slug) {
		try {
			await this.databases.deleteDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				slug
			);
			return true;
		} catch (error) {
			console.log('appwriteService deletepost ::', error);
			return false;
		}
	}

	async getPost(slug) {
		try {
			return await this.databases.getDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				slug
			);
		} catch (error) {
			console.log('appwrite getPost :: ', error);
			return false;
		}
	}

	async getAllPosts() {
		try {
			return await this.databases.listDocuments(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				[Query.equal('status', ['active'])]
			);
		} catch (error) {
			console.log('appwriteService getAllPosts', error);
			return false;
		}
	}

	// File upload services

	async uploadFile(file) {
		try {
			return await this.bucket.createFile(
				config.appwrite.bucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.log('appwriteservice uploadfile', error);
			return false;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(config.appwrite.bucketId, fileId);
			return true;
		} catch (error) {
			console.log('appwriteservice deletefile', error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.bucket.getFilePreview(config.appwrite.bucketId, fileId);
		} catch (error) {
			console.log('appwriteservice getFilePreview', error);
			return false;
		}
	}
}

const appwriteService = new AppwriteService();

export default appwriteService;
