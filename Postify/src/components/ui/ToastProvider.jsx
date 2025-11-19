import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
	return (
		<Toaster
			position='top-right'
			toastOptions={{
				duration: 4000,
				style: {
					background: '#fff',
					color: '#111827',
					borderRadius: '0.75rem',
					boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
					padding: '16px',
				},
				success: {
					iconTheme: {
						primary: '#10b981',
						secondary: '#fff',
					},
				},
				error: {
					iconTheme: {
						primary: '#ef4444',
						secondary: '#fff',
					},
				},
			}}
		/>
	);
};

export default ToastProvider;

