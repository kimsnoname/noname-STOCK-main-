import { Application } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const setupProxy = (app: Application) => {
    app.use(
        '/api/v1',
        createProxyMiddleware({
            target: 'http://localhost:8080',
            changeOrigin: true,
        })
    );
};

export default setupProxy;
