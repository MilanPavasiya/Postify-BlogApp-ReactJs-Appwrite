import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

function RTE({ name, control, label, defaultValue = '' }) {
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
					render={({ field: { onChange } }) => (
						<Editor
							apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
							initialValue={defaultValue}
							init={{
								initialValue: defaultValue,
								height: 500,
								menubar: true,
								plugins: [
									'image',
									'advlist',
									'autolink',
									'lists',
									'link',
									'image',
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
									'code',
									'help',
									'wordcount',
									'anchor',
								],
								toolbar:
									'undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help',
								content_style:
									'body { font-family:Helvetica,Arial,sans-serif; font-size:16px; line-height:1.6; color:#374151; }',
							}}
							onEditorChange={onChange}
						/>
					)}
				/>
			</div>
		</div>
	);
}

export default RTE;
