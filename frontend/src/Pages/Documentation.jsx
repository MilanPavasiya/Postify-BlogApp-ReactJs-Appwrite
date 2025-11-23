import React, { useState } from 'react';
import { Container, Button } from '../components/index';
import { Link } from 'react-router-dom';

function Documentation() {
	const [activeSection, setActiveSection] = useState('overview');

	const sections = [
		{ id: 'overview', title: 'Overview', icon: '📚' },
		{ id: 'features', title: 'Features', icon: '✨' },
		{ id: 'authentication', title: 'Authentication', icon: '🔐' },
		{ id: 'posts', title: 'Posts Management', icon: '📝' },
		{ id: 'integrations', title: 'Integrations', icon: '🔌' },
		{ id: 'api', title: 'API Reference', icon: '⚙️' },
		{ id: 'deployment', title: 'Deployment', icon: '🚀' },
	];

	const content = {
		overview: (
			<div className='space-y-6'>
				<div className='bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100'>
					<h2 className='text-2xl font-bold text-gray-900 mb-4'>What is Postify?</h2>
					<p className='text-gray-700 leading-relaxed'>
						Postify is a modern, full-stack blogging platform that allows users to create, manage, and
						share their content in a private and secure environment. Built with cutting-edge technologies,
						Postify provides a seamless experience for content creators who want to focus on writing
						without worrying about complex setups.
					</p>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
						<h3 className='text-xl font-bold text-gray-900 mb-3'>🎯 Core Purpose</h3>
						<p className='text-gray-600'>
							Postify enables users to create beautiful blog posts with rich text editing, image
							uploads, and complete privacy control. All posts are private to each user, ensuring
							complete content ownership and security.
						</p>
					</div>
					<div className='bg-white rounded-xl p-6 shadow-lg border border-gray-100'>
						<h3 className='text-xl font-bold text-gray-900 mb-3'>🏗️ Architecture</h3>
						<p className='text-gray-600'>
							Built with React for the frontend, Appwrite for backend services, and AWS S3 for image
							storage. The application follows modern best practices with Redux for state management and
							React Router for navigation.
						</p>
					</div>
				</div>
			</div>
		),
		features: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>Key Features</h2>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>📝 Rich Text Editor</h3>
							<p className='text-gray-700 mb-4'>
								Powered by TinyMCE, our editor provides a comprehensive set of formatting tools
								including:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Text formatting (bold, italic, underline)</li>
								<li>Lists (ordered and unordered)</li>
								<li>Links and images</li>
								<li>Code blocks and syntax highlighting</li>
								<li>Tables and media embedding</li>
								<li>Full-screen editing mode</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🖼️ Image Management</h3>
							<p className='text-gray-700 mb-4'>
								Seamless image upload and management with built-in validation:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Support for PNG, JPG, JPEG, and GIF formats</li>
								<li>Maximum file size: 1MB per image</li>
								<li>Automatic validation before upload</li>
								<li>Secure S3 storage integration</li>
								<li>Optimized image delivery</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🔒 Privacy & Security</h3>
							<p className='text-gray-700 mb-4'>
								Complete privacy control and security features:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>All posts are private to the user</li>
								<li>User-based authentication and authorization</li>
								<li>Secure session management</li>
								<li>Ownership verification for all operations</li>
								<li>Protected API endpoints</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>⚡ Performance</h3>
							<p className='text-gray-700 mb-4'>
								Optimized for speed and responsiveness:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Fast page load times</li>
								<li>Responsive design for all devices</li>
								<li>Efficient data fetching</li>
								<li>Smooth animations and transitions</li>
								<li>Optimized image loading</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🎯 Navigation System</h3>
							<p className='text-gray-700 mb-4'>
								Intuitive navigation designed for optimal user experience:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Desktop Sidebar:</strong> Fixed left sidebar navigation on desktop (lg screens and up) with icon-based menu items</li>
								<li><strong>Mobile Header:</strong> Responsive top header navigation for mobile and tablet devices</li>
								<li><strong>Active Route Highlighting:</strong> Visual indication of current page with gradient background</li>
								<li><strong>Authentication-Aware:</strong> Navigation items dynamically show/hide based on user login status</li>
								<li><strong>Smooth Transitions:</strong> Hover effects and smooth transitions for better interactivity</li>
								<li><strong>Quick Access:</strong> Easy access to all major sections including Home, Posts, Documentation, Features, Pricing, and Contact</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		),
		authentication: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>Authentication System</h2>
					
					<div className='space-y-6'>
						<div className='p-6 bg-blue-50 rounded-lg border border-blue-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>User Registration</h3>
							<p className='text-gray-700 mb-4'>
								New users can create an account by providing:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Full Name</li>
								<li>Valid Email Address</li>
								<li>Secure Password (minimum 6 characters)</li>
							</ul>
							<p className='text-gray-700 mt-4'>
								Upon successful registration, users are automatically logged in and redirected to the home page.
							</p>
						</div>

						<div className='p-6 bg-purple-50 rounded-lg border border-purple-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Login Process</h3>
							<p className='text-gray-700 mb-4'>
								Existing users can log in using their email and password. The system:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Validates credentials against Appwrite</li>
								<li>Creates a secure session</li>
								<li>Stores user data in Redux state</li>
								<li>Maintains authentication across page refreshes</li>
							</ul>
						</div>

						<div className='p-6 bg-green-50 rounded-lg border border-green-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Session Management</h3>
							<p className='text-gray-700 mb-4'>
								The application uses Appwrite's session management for secure authentication:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Automatic session validation on app load</li>
								<li>Persistent sessions across browser restarts</li>
								<li>Secure logout functionality</li>
								<li>Protected routes requiring authentication</li>
							</ul>
						</div>

						<div className='p-6 bg-orange-50 rounded-lg border border-orange-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>State Management</h3>
							<p className='text-gray-700 mb-4'>
								User authentication state is managed using Redux Toolkit:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Centralized auth state in Redux store</li>
								<li>Automatic state updates on login/logout</li>
								<li>User data available throughout the application</li>
								<li>Reactive UI updates based on auth status</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		),
		posts: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>Posts Management</h2>
					
					<div className='space-y-6'>
						<div className='p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Creating Posts</h3>
							<p className='text-gray-700 mb-4'>
								To create a new post, users must:
							</p>
							<ol className='list-decimal list-inside space-y-2 text-gray-600'>
								<li>Navigate to "Add Post" from the sidebar navigation (desktop) or header menu (mobile)</li>
								<li>Enter a descriptive title (required)</li>
								<li>Upload a featured image (PNG, JPG, JPEG, or GIF, max 1MB)</li>
								<li>Write content using the rich text editor</li>
								<li>Select post status (active or inactive)</li>
								<li>Click "Publish Post" to save</li>
							</ol>
							<p className='text-gray-700 mt-4'>
								The URL slug is automatically generated from the title and can be manually adjusted if needed.
							</p>
						</div>

						<div className='p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Editing Posts</h3>
							<p className='text-gray-700 mb-4'>
								Users can edit their existing posts by:
							</p>
							<ol className='list-decimal list-inside space-y-2 text-gray-600'>
								<li>Opening any post from their posts list</li>
								<li>Clicking the "Edit" button (visible only to post owner)</li>
								<li>Modifying title, content, image, or status</li>
								<li>Clicking "Update Post" to save changes</li>
							</ol>
							<p className='text-gray-700 mt-4'>
								All changes are immediately saved to the database and reflected in the post view.
							</p>
						</div>

						<div className='p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Deleting Posts</h3>
							<p className='text-gray-700 mb-4'>
								To delete a post:
							</p>
							<ol className='list-decimal list-inside space-y-2 text-gray-600'>
								<li>Open the post you want to delete</li>
								<li>Click the "Delete" button (visible only to post owner)</li>
								<li>Confirm the deletion</li>
							</ol>
							<p className='text-red-600 font-semibold mt-4'>
								⚠️ Warning: Deletion is permanent and cannot be undone.
							</p>
						</div>

						<div className='p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Post Privacy</h3>
							<p className='text-gray-700 mb-4'>
								All posts in Postify are completely private:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li>Each user can only see and manage their own posts</li>
								<li>Posts are filtered by userId in all queries</li>
								<li>Ownership is verified before any update or delete operation</li>
								<li>No cross-user data access is possible</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Post Status</h3>
							<p className='text-gray-700 mb-4'>
								Posts can have two statuses:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Active:</strong> Post is visible in your posts list</li>
								<li><strong>Inactive:</strong> Post is hidden but not deleted</li>
							</ul>
							<p className='text-gray-700 mt-4'>
								Only active posts are displayed in the "All Posts" view. Status can be changed at any time when editing a post.
							</p>
						</div>
					</div>
				</div>
			</div>
		),
		integrations: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>Third-Party Integrations</h2>
					
					<div className='space-y-6'>
						<div className='p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🔵 Appwrite Integration</h3>
							<p className='text-gray-700 mb-4'>
								Appwrite serves as the primary backend service for Postify, providing:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Authentication:</strong> User registration, login, session management</li>
								<li><strong>Database:</strong> Document storage for posts with structured schemas</li>
								<li><strong>Queries:</strong> Advanced filtering and querying capabilities</li>
								<li><strong>Security:</strong> Built-in security rules and access control</li>
							</ul>
							<div className='mt-4 p-4 bg-blue-100 rounded-lg'>
								<p className='text-sm text-gray-700'>
									<strong>Configuration:</strong> Appwrite endpoint and project ID are configured in the config file. 
									The service handles all database operations including create, read, update, and delete operations.
								</p>
							</div>
						</div>

						<div className='p-6 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-orange-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>☁️ AWS S3 Integration</h3>
							<p className='text-gray-700 mb-4'>
								AWS S3 is used for secure image storage and delivery:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Presigned URLs:</strong> Secure, time-limited upload URLs generated by backend</li>
								<li><strong>Direct Upload:</strong> Images uploaded directly from client to S3</li>
								<li><strong>Public URLs:</strong> Optimized CDN delivery for fast image loading</li>
								<li><strong>Scalability:</strong> Handles unlimited image storage</li>
							</ul>
							<div className='mt-4 p-4 bg-orange-100 rounded-lg'>
								<p className='text-sm text-gray-700'>
									<strong>Upload Flow:</strong> Frontend requests presigned URL from backend API → 
									Uploads image directly to S3 → Receives public URL → Stores URL in post document.
								</p>
							</div>
						</div>

						<div className='p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>📝 TinyMCE Editor</h3>
							<p className='text-gray-700 mb-4'>
								TinyMCE provides the rich text editing experience:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>WYSIWYG Editing:</strong> What You See Is What You Get interface</li>
								<li><strong>Rich Formatting:</strong> Text styles, lists, links, images, tables</li>
								<li><strong>Code Editing:</strong> Syntax highlighting and code blocks</li>
								<li><strong>Media Support:</strong> Embed images and media content</li>
								<li><strong>Responsive:</strong> Works seamlessly on all device sizes</li>
							</ul>
							<div className='mt-4 p-4 bg-purple-100 rounded-lg'>
								<p className='text-sm text-gray-700'>
									<strong>Integration:</strong> TinyMCE is integrated via react-hook-form Controller 
									for seamless form state management. Content is stored as HTML in the database.
								</p>
							</div>
						</div>

						<div className='p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🔄 Redux State Management</h3>
							<p className='text-gray-700 mb-4'>
								Redux Toolkit manages application-wide state:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Auth State:</strong> User authentication status and user data</li>
								<li><strong>Centralized Store:</strong> Single source of truth for app state</li>
								<li><strong>Reactive Updates:</strong> Components automatically update on state changes</li>
								<li><strong>Persistence:</strong> Auth state persists across page refreshes</li>
							</ul>
						</div>

						<div className='p-6 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg border border-indigo-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>🎨 Tailwind CSS</h3>
							<p className='text-gray-700 mb-4'>
								Tailwind CSS provides utility-first styling:
							</p>
							<ul className='list-disc list-inside space-y-2 text-gray-600'>
								<li><strong>Utility Classes:</strong> Rapid UI development with utility classes</li>
								<li><strong>Responsive Design:</strong> Built-in responsive breakpoints</li>
								<li><strong>Custom Animations:</strong> Custom keyframe animations and transitions</li>
								<li><strong>Gradient Support:</strong> Beautiful gradient backgrounds and text</li>
								<li><strong>Modern UI Components:</strong> Sidebar navigation, responsive headers, and polished interface elements</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		),
		api: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>API Reference</h2>
					
					<div className='space-y-6'>
						<div className='p-6 bg-gray-50 rounded-lg border border-gray-200'>
							<h3 className='text-xl font-bold text-gray-900 mb-4'>Authentication API</h3>
							<div className='space-y-4'>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>createAccount({'{'} email, password, name {'}'})</code>
									<p className='text-gray-600 text-sm mt-2'>Creates a new user account and automatically logs in the user.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>login({'{'} email, password {'}'})</code>
									<p className='text-gray-600 text-sm mt-2'>Authenticates user and creates a session.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>getCurrentUser()</code>
									<p className='text-gray-600 text-sm mt-2'>Returns the currently authenticated user data.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>logout()</code>
									<p className='text-gray-600 text-sm mt-2'>Terminates the current user session.</p>
								</div>
							</div>
						</div>

						<div className='p-6 bg-gray-50 rounded-lg border border-gray-200'>
							<h3 className='text-xl font-bold text-gray-900 mb-4'>Posts API</h3>
							<div className='space-y-4'>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>createPost({'{'} title, content, featuredImage, status, userId {'}'})</code>
									<p className='text-gray-600 text-sm mt-2'>Creates a new post with unique document ID. Returns the created post.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>getPost(postId, userId)</code>
									<p className='text-gray-600 text-sm mt-2'>Retrieves a post by ID. Verifies ownership if userId is provided.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>getAllPosts(userId)</code>
									<p className='text-gray-600 text-sm mt-2'>Retrieves all active posts for the specified user. Filters by userId and status.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>updatePost(postId, data, userId)</code>
									<p className='text-gray-600 text-sm mt-2'>Updates an existing post. Verifies ownership before updating.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>deletePost(postId, userId)</code>
									<p className='text-gray-600 text-sm mt-2'>Deletes a post. Verifies ownership before deletion.</p>
								</div>
							</div>
						</div>

						<div className='p-6 bg-gray-50 rounded-lg border border-gray-200'>
							<h3 className='text-xl font-bold text-gray-900 mb-4'>File Upload API</h3>
							<div className='space-y-4'>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>uploadToS3(file)</code>
									<p className='text-gray-600 text-sm mt-2'>Uploads an image file to AWS S3. Validates file size (max 1MB) and type (PNG, JPG, JPEG, GIF). Returns public URL.</p>
								</div>
								<div className='bg-white p-4 rounded border border-gray-200'>
									<code className='text-sm font-mono text-blue-600'>validateImage(file)</code>
									<p className='text-gray-600 text-sm mt-2'>Validates image file before upload. Checks size, MIME type, and file extension.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		),
		deployment: (
			<div className='space-y-6'>
				<div className='bg-white rounded-xl p-8 shadow-lg border border-gray-100'>
					<h2 className='text-3xl font-bold text-gray-900 mb-6'>Deployment Guide</h2>
					
					<div className='space-y-6'>
						<div className='p-6 bg-blue-50 rounded-lg border border-blue-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Environment Variables</h3>
							<p className='text-gray-700 mb-4'>
								Configure the following environment variables before deployment:
							</p>
							<div className='bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto'>
								<pre>{`VITE_APPWRITE_URL=your_appwrite_endpoint
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_TINYMCE_API_KEY=your_tinymce_key
VITE_API_BASE_URL=your_backend_api_url`}</pre>
							</div>
						</div>

						<div className='p-6 bg-purple-50 rounded-lg border border-purple-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Appwrite Setup</h3>
							<ol className='list-decimal list-inside space-y-2 text-gray-700'>
								<li>Create an Appwrite project</li>
								<li>Set up a database and collection with the following attributes:
									<ul className='list-disc list-inside ml-6 mt-2 space-y-1 text-gray-600'>
										<li>title (string, required)</li>
										<li>content (string, required)</li>
										<li>featuredImage (string)</li>
										<li>status (string, required)</li>
										<li>userId (string, required)</li>
									</ul>
								</li>
								<li>Configure authentication settings</li>
								<li>Set up security rules for database access</li>
							</ol>
						</div>

						<div className='p-6 bg-green-50 rounded-lg border border-green-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>AWS S3 Setup</h3>
							<ol className='list-decimal list-inside space-y-2 text-gray-700'>
								<li>Create an S3 bucket</li>
								<li>Configure CORS settings for your domain</li>
								<li>Set up IAM user with S3 upload permissions</li>
								<li>Configure backend API with AWS credentials</li>
								<li>Set up presigned URL generation endpoint</li>
							</ol>
						</div>

						<div className='p-6 bg-orange-50 rounded-lg border border-orange-100'>
							<h3 className='text-xl font-bold text-gray-900 mb-3'>Build & Deploy</h3>
							<ol className='list-decimal list-inside space-y-2 text-gray-700'>
								<li>Install dependencies: <code className='bg-gray-200 px-2 py-1 rounded'>npm install</code></li>
								<li>Build for production: <code className='bg-gray-200 px-2 py-1 rounded'>npm run build</code></li>
								<li>Deploy the <code className='bg-gray-200 px-2 py-1 rounded'>dist</code> folder to your hosting service</li>
								<li>Configure your domain and SSL certificate</li>
								<li>Test all functionality in production environment</li>
							</ol>
						</div>
					</div>
				</div>
			</div>
		),
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50'>
			<div className='py-8 sm:py-12 md:py-16'>
				<Container>
					<div className='max-w-7xl mx-auto px-4 sm:px-0'>
						<div className='text-center mb-8 sm:mb-12 animate-fade-in'>
							<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 sm:mb-6 animate-slide-up'>
								Documentation
							</h1>
							<p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
								Complete guide to Postify's features, integrations, and functionality
							</p>
						</div>

						<div className='grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8'>
							<div className='lg:col-span-1'>
								<div className='sticky top-20 lg:top-24 bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6'>
									<h2 className='text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4'>Table of Contents</h2>
									<nav className='space-y-1 sm:space-y-2'>
										{sections.map((section) => (
											<button
												key={section.id}
												onClick={() => setActiveSection(section.id)}
												className={`w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
													activeSection === section.id
														? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg transform scale-105'
														: 'text-gray-700 hover:bg-gray-100 hover:translate-x-1'
												}`}>
												<span className='text-lg sm:text-xl'>{section.icon}</span>
												<span className='font-medium'>{section.title}</span>
											</button>
										))}
									</nav>
								</div>
							</div>

							<div className='lg:col-span-3'>
								<div className='animate-fade-in-up'>
									{content[activeSection]}
								</div>
							</div>
						</div>

						<div className='mt-8 sm:mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-white text-center animate-fade-in'>
							<h2 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>Ready to Get Started?</h2>
							<p className='text-sm sm:text-base mb-4 sm:mb-6 opacity-90'>
								Start creating amazing content with Postify today!
							</p>
							<div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center'>
								<Link to='/signup'>
									<Button className='bg-white text-blue-600 hover:bg-gray-100 w-full sm:w-auto'>
										Sign Up Free
									</Button>
								</Link>
								<Link to='/contact'>
									<Button className='bg-purple-700 hover:bg-purple-800 text-white border-2 border-white w-full sm:w-auto'>
										Contact Support
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</Container>
			</div>
		</div>
	);
}

export default Documentation;


