import path from 'path';
import express from 'express';
import http from 'http';
import helmet from 'helmet';
import expressStaticGzip from 'express-static-gzip';
import compression from 'compression';

import rootname from '../../rootname';

const app = express();

const buildPath = path.join(rootname, '../client/build');

app.use('/', expressStaticGzip(buildPath));
app.use(express.static(buildPath));
app.use(helmet());
app.use(express.json());
app.use(compression());

const port = process.env.PORT || 4000;

const server = http.createServer(app);

export { app, port, server };
