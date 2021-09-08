const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

router.render = (req, res) => {
  // add count meta to paginated requests
  if (req.originalUrl.indexOf("_page") > -1) {
    res.json({
      results: res.locals.data,
      meta: {
        count: res.get("X-Total-Count"),
      },
    });
  } else {
    // send unmodified response
    res.json({
      results: res.locals.data,
      meta: {
        count: res.get("X-Total-Count"),
      },
    });
  }
};

server.use(middlewares);
server.use(router);

server.listen(port);
