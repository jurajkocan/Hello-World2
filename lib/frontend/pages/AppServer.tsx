import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getStyles } from 'typestyle';
import { renderHtml } from '../RenderHtml';
import { LoginPage, LoginProps } from '../components/Login';

const styles = [
    'https://cdnjs.cloudflare.com/ajax/libs/antd/2.12.3/antd.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css'
];

const js: string[] = [
    '/app.js'
];

export const renderApp = () => {
    const bodyHtml = ReactDOMServer.renderToString(
        <div>WELCOME</div>
    );

    const appStyle = getStyles();
    const html = renderHtml(
        '', styles, appStyle, {}, bodyHtml, js);
    return html;
}
