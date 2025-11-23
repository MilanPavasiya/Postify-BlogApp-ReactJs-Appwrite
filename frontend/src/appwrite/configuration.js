import config from '../config/config.js';
import { Client, Databases, Query, ID, Storage } from 'appwrite';
import { validateImage } from '../utils/validateImage.js';

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

	async createPost({ title, content, featuredImage, status, userId }) {
		try {
			return await this.databases.createDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				ID.unique(),
				{
					title,
					content,
					featuredImage,
					status,
					userId,
				}
			);
		} catch (error) {
			console.error('appwriteService createPost error:', error);
			throw error;
		}
	}

	async updatePost(postId, { title, content, featuredImage, status }, userId = null) {
		try {
			if (userId) {
				const post = await this.getPost(postId, userId);
				if (!post) {
					throw new Error('Post not found or you do not have permission to update it');
				}
			}

			return await this.databases.updateDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				postId,
				{
					title,
					content,
					featuredImage,
					status,
				}
			);
		} catch (error) {
			console.error('appwriteService updatePost error:', error);
			throw error;
		}
	}

	async deletePost(postId, userId = null) {
		try {
			if (userId) {
				const post = await this.getPost(postId, userId);
				if (!post) {
					throw new Error('Post not found or you do not have permission to delete it');
				}
			}

			await this.databases.deleteDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				postId
			);
			return true;
		} catch (error) {
			console.error('appwriteService deletePost error:', error);
			return false;
		}
	}

	async getPost(postId, userId = null) {
		try {
			const post = await this.databases.getDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				postId
			);

			if (userId && post && post.userId !== userId) {
				return false;
			}

			return post || false;
		} catch (error) {
			console.error('appwriteService getPost error:', error);
			return false;
		}
	}

	async getAllPosts(userId) {
		try {
			const queries = [Query.equal('status', ['active'])];
			if (userId) {
				queries.push(Query.equal('userId', [userId]));
			}

			return await this.databases.listDocuments(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				queries
			);
		} catch (error) {
			console.error('appwriteService getAllPosts error:', error);
			return false;
		}
	}

	async uploadFile(file) {
		try {
			const validation = validateImage(file);
			if (!validation.isValid) {
				throw new Error(validation.error);
			}

			return await this.bucket.createFile(
				config.appwrite.bucketId,
				ID.unique(),
				file
			);
		} catch (error) {
			console.error('appwriteService uploadFile error:', error);
			throw error;
		}
	}

	async deleteFile(fileId) {
		try {
			await this.bucket.deleteFile(config.appwrite.bucketId, fileId);
			return true;
		} catch (error) {
			console.error('appwriteService deleteFile error:', error);
			return false;
		}
	}

	getFilePreview(fileId) {
		try {
			return this.bucket.getFilePreview(config.appwrite.bucketId, fileId);
		} catch (error) {
			console.error('appwriteService getFilePreview error:', error);
			return false;
		}
	}
}

const appwriteService = new AppwriteService();

export default appwriteService;
