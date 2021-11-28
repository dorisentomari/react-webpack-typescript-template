import React from 'react';
import {connect} from 'react-redux';

import {RootState} from '@/store/reducers';
import {HomeState} from '@/store/reducers/home';
import {HomeProps} from '@/pages/home/types';
import homeActions from '@/store/actions/home';
import styles from './index.module.less';

import avatar from '@/assets/images/avatar.jpg';

function Home(props: HomeProps) {
	return (
		<div>
			<h3>Home Page</h3>
			<p><img className={styles.avatar} src={avatar} alt="avatar"/></p>
			<p>
				<b>{props.counter}</b>
				<button onClick={() => props.setCounter(props.counter + 1)}>add counter</button>
			</p>
		</div>
	);
}

export const mapStateToProps = (state: RootState): HomeState => state.home;

export default connect(mapStateToProps, homeActions)(Home);
