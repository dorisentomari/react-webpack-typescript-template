import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';

import Loading from '@/components/Loading';

import store from '@/store';
import './global.less';
import styles from './index.module.less';

const Nav = React.lazy(() => import('@/components/nav/index'));
const Home = React.lazy(() => import('@/pages/home/index'));
const Login = React.lazy(() => import('@/pages/login/index'));

function App() {
	return (
		<Provider store={store}>
			<React.Suspense fallback={<Loading/>}>
				<BrowserRouter>
					<div className={styles.container}>
						<Nav/>
						<Routes>
							<Route path="/" element={<Home/>}/>
							<Route path="/login" element={<Login/>}/>
							<Route path="*" element={<Home/>}/>
						</Routes>
					</div>
				</BrowserRouter>
			</React.Suspense>
		</Provider>
	);
}

ReactDOM.render(<App/>, document.getElementById('root'));
