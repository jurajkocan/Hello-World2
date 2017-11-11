import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { RegistrationPage } from '../components/Register';
import { getStyles } from 'typestyle/lib';
import { renderHtml } from '../RenderHtml';

const styles = [
    'https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.3/antd.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
];

const js: string[] = [
    '/registration.js'
];

export const renderRegister = () => {
    const bodyHtml = ReactDOMServer.renderToString(
        <RegistrationPage />
    );
    const appStyle = getStyles();
    const html = renderHtml(
        '', styles, appStyle, {}, bodyHtml, js);
    return html;
}
