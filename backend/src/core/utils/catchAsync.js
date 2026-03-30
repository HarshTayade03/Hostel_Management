// CatchAsync utility to wrap async route handlers
// This avoids having to write try-catch blocks in every controller
module.exports = fn => {
    return (req, res, next) => {
      fn(req, res, next).catch(next);
    };
  };
