import './App.css';
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { useEffect, useState } from 'react';
import { login, logout } from './store/authSlice';
import { Header, Sidebar } from './components/index';
import { Footer } from './components/index';
import { Outlet } from 'react-router-dom';

function App() {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		authService
			.getCurrentUser()
			.then((userData) => {
				if (userData) {
					dispatch(login({ userData }));
				} else {
					dispatch(logout());
				}
			})
			.catch((e) => {
				console.log('App.js useEffect for authService', e);
			})
			.finally(() => setLoading(false));
	}, []);

	return !loading ? (
		<div className='min-h-screen flex flex-col bg-white'>
			<Sidebar />
			<Header />
			<div className='flex-1 flex flex-col md:ml-64'>
				<main className='flex-1'>
					<Outlet />
				</main>
				<Footer />
			</div>
		</div>
	) : null;
}

export default App;
