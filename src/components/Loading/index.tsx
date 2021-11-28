import React from 'react';
import {Spin} from 'antd';

import styles from './index.module.less';

function Loading() {
	return (
		<div className={styles.loadingWrapper}>
			<Spin/>
		</div>
	);
}

export default Loading;
