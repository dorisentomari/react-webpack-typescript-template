import {PropsWithChildren} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import homeActions from '@/store/actions/home';

export type IDispatchProps = typeof homeActions;

export type HomeProps = PropsWithChildren<RouteComponentProps> & IDispatchProps;
