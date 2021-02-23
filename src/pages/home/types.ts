import {PropsWithChildren} from 'react';
import {RouteComponentProps} from 'react-router-dom';

import {mapStateToProps} from '@/pages/Home/index';
import homeActions from '@/store/actions/home';

export type IStateProps = ReturnType<typeof mapStateToProps>;

export type IDispatchProps = typeof homeActions;

export type HomeProps = PropsWithChildren<RouteComponentProps> & IStateProps & IDispatchProps;
