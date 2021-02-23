import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {Spin} from 'antd';

import history from '@/store/history';
import store from '@/store';
import '@/assets/style/global.less';

const Home = React.lazy(() => import('@/pages/home/index'));

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<React.Suspense fallback={<Spin/>}>
				<Switch>
					<Route path="/" exact={true} component={Home} />
					<Redirect to="/"/>
				</Switch>
			</React.Suspense>
		</ConnectedRouter>
	</Provider>, document.getElementById('root'));
