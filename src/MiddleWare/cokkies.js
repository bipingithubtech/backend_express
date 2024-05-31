// lastTimeVisited.js
const lastTimeVisited = (req, res, next) => {
  if (req.cookies.lastTime) {
    res.locals.lastTime = new Date(req.cookies.lastTime).toLocaleString();
  }
  res.cookie("lastTime", new Date().toISOString(), {
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days
  });
  next();
};

export default lastTimeVisited;
