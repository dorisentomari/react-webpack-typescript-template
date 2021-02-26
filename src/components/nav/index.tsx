import React from 'react';
import {NavLink} from 'react-router-dom';

import './index.less';

function Nav() {
	return (
		<div>
			<ul>
				<li><NavLink to="/">home</NavLink></li>
				<li><NavLink to="/login">login</NavLink></li>
			</ul>
		</div>
	);
}

export default Nav;
