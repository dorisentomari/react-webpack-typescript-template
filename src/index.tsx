import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Spin} from 'antd';

import history from '@/store/history';
import store from '@/store';
import '@/assets/style/global.less';
import './index.less';

const Nav = React.lazy(() => import('@/components/nav/index'));
const Home = React.lazy(() => import('@/pages/home/index'));
const Login = React.lazy(() => import('@/pages/login/index'));

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<React.Suspense fallback={<Spin/>}>
				<div className="container">
					<Nav/>
					<Switch>
						<Route path="/" exact={true} component={Home} />
						<Route path="/login" exact={true} component={Login} />
						<Redirect to="/"/>
					</Switch>
				</div>
			</React.Suspense>
		</ConnectedRouter>
	</Provider>, document.getElementById('root'));
