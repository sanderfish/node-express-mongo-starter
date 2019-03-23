const catchErrors = fn => (req, res, next) => fn(req, res, next).catch(next);

const notFound = (req, res, next) => {
  const err = new error('Not Found');
  err.status = 404;
  next(err);
};

const developmentErrorHandler = (err, req, res, next) => {
  err.stack = err.stack || '';

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>',
    ),
  };

  res.status(err.status || 500);
  res.format({
    'application/json': () => res.json({ error: errorDetails }),
  });
};

const productionErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json('error', {
    message: err.message,
    error: {},
  });
};

export {
  catchErrors,
  notFound,
  developmentErrorHandler,
  productionErrorHandler,
};
