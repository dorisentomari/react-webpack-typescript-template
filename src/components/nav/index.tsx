import React from 'react';
import {NavLink} from 'react-router-dom';

import styles from './index.module.less';

function Nav() {
	return (
		<div className={styles.navWrapper}>
			<ul className={styles.list}>
				<li className={styles.listItem}><NavLink to="/">home</NavLink></li>
				<li className={styles.listItem}><NavLink to="/login">login</NavLink></li>
			</ul>
		</div>
	);
}

export default Nav;
