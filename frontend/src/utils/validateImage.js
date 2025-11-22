// File validation constants
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
const ALLOWED_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif'];

/**
 * Validates image file for size and type
 * @param {File} file - The file to validate
 * @returns {{isValid: boolean, error: string|null}} - Validation result
 */
export const validateImage = (file) => {
	if (!file) {
		return { isValid: false, error: 'No file selected' };
	}

	// Check file size
	if (file.size > MAX_FILE_SIZE) {
		const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
		return {
			isValid: false,
			error: `File size (${fileSizeMB}MB) exceeds the maximum allowed size of 1MB. Please choose a smaller image.`,
		};
	}

	// Check file type
	if (!ALLOWED_TYPES.includes(file.type)) {
		return {
			isValid: false,
			error: 'Invalid file type. Only PNG, JPG, JPEG, and GIF images are allowed.',
		};
	}

	// Double-check by file extension (in case MIME type is missing)
	const fileName = file.name.toLowerCase();
	const hasValidExtension = ALLOWED_EXTENSIONS.some((ext) =>
		fileName.endsWith(ext)
	);

	if (!hasValidExtension) {
		return {
			isValid: false,
			error: 'Invalid file extension. Only .png, .jpg, .jpeg, and .gif files are allowed.',
		};
	}

	return { isValid: true, error: null };
};

