import config from '../config/config.js';
import { Client, Databases, Query, ID } from 'appwrite';

export class AppwriteService {
	client = new Client();
	databases;

	constructor() {
		this.client
			.setEndpoint(config.appwrite.url)
			.setProject(config.appwrite.projectId);
		this.databases = new Databases(this.client);
	}

	async createPost({ title, slug, content, featuredImage, status, userId }) {
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
			console.log('appwriteService createpost', error);
			throw error;
		}
	}

	async updatePost(postId, { title, slug, content, featuredImage, status }, userId = null) {
		try {
			// If userId is provided, verify ownership before updating
			if (userId) {
				const post = await this.getPost(postId, userId);
				if (!post) {
					throw new Error('Post not found or you do not have permission to update it');
				}
			}
			const updateData = {
				title,
				content,
				featuredImage,
				status,
			};
			// Note: slug is not stored in Appwrite - it's only for UI display
			return await this.databases.updateDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				postId,
				updateData
			);
		} catch (error) {
			console.log('appwriteService updatepost :: ', error);
			throw error;
		}
	}

	async deletePost(postId, userId = null) {
		try {
			// If userId is provided, verify ownership before deleting
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
			console.log('appwriteService deletepost ::', error);
			return false;
		}
	}

	async getPost(postId, userId = null) {
		try {
			// Get post by document ID (which is what we use for routing)
			const post = await this.databases.getDocument(
				config.appwrite.databaseId,
				config.appwrite.collectionId,
				postId
			);
			
			// If userId is provided, verify ownership
			if (userId && post && post.userId !== userId) {
				return false;
			}
			return post || false;
		} catch (error) {
			console.log('appwrite getPost :: ', error);
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
			console.log('appwriteService getAllPosts', error);
			return false;
		}
	}

	// appwrite File upload services

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
