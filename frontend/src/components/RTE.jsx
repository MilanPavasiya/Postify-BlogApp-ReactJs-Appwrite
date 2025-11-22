import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = '', key }) {
	return (
		<div className='w-full'>
			{label && (
				<label className='inline-block mb-2 text-sm font-medium text-gray-700'>
					{label}
				</label>
			)}

			<div className='border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200'>
				<Controller
					name={name || 'content'}
					control={control}
					defaultValue={defaultValue}
					render={({ field: { onChange, value } }) => {
						// Use value from form state, fallback to empty string if undefined/null
						const editorValue = value !== undefined && value !== null ? value : '';
						
						return (
							<Editor
								key={key || 'editor'}
								apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
								value={editorValue}
								init={{
									height: 500,
									menubar: true,
									plugins: [
										'image',
										'advlist',
										'autolink',
										'lists',
										'link',
										'charmap',
										'preview',
										'anchor',
										'searchreplace',
										'visualblocks',
										'code',
										'fullscreen',
										'insertdatetime',
										'media',
										'table',
										'help',
										'wordcount',
									],
									toolbar:
										'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
									content_style:
										'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; color:#374151; }',
								}}
								onEditorChange={(content) => {
									onChange(content);
								}}
							/>
						);
					}}
				/>
			</div>
		</div>
	);
}

export default RTE;
