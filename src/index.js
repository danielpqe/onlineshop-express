(() => {
  const express = require('express');
  const app = express();
  const cors = require('cors');
  const routerApi = require('./routes/index');
  const {
    logErrors,
    errorHandler,
    boomErrorHandler,
  } = require('./middlewares/errorHandler');

  const PORT = process.env.PORT || 3000;
  app.use(express.json());

  const whiteList = ['http://localhost:8080', 'http://myapp.com'];

  const options = {
    origin: (origin, callback) => {
      if (whiteList.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('no permitido'));
      }
    },
  };

  app.use(cors(options));
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  routerApi(app);
  // always after the routing
  app.use(boomErrorHandler);
  app.use(logErrors);
  app.use(errorHandler);
})();
