import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { RegistrationPage } from '../components/Register';

declare const window: any;

const initialState = window.INIT_STATE;

ReactDOM.render(
    <RegistrationPage />,
    document.getElementById('root') as HTMLDivElement
);


declare var module: any;

if (module.hot) {
    module.hot.accept();
}
