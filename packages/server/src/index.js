import 'dotenv/config';

import { app, port, server } from './service/express';

import routes from './routes/index';

app.get('/endpoint', await routes.simple());
app.get('*', routes.root());

server.listen(port, () => {
  console.log(`http server running on port ${port}`);
});
