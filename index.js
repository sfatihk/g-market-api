const url = require("url");
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const paginate = require("./paginate");
const port = process.env.PORT || 3000;

router.render = (req, res) => {
  const data = res.locals.data;
  //if its not items route
  if (!req.originalUrl.includes("items")) {
    res.json({
      meta: {
        totalCount: data.length,
      },
      results: data,
    });
    return;
  }

  var page = 1;
  const perPage = 16;
  //if p parameter came
  if (req.originalUrl.indexOf("p=") > -1) {
    const urlParts = url.parse(req.url, true);
    page = urlParts.query.p;
  }

  const brandsPool = {};
  const tagsPool = {};
  const itemTypesPool = {};

  for (var i = 0; i < data.length; i++) {
    if (brandsPool[data[i].manufacturer]) {
      brandsPool[data[i].manufacturer] += 1;
    } else {
      brandsPool[data[i].manufacturer] = 1;
    }

    if (itemTypesPool[data[i].itemType]) {
      itemTypesPool[data[i].itemType] += 1;
    } else {
      itemTypesPool[data[i].itemType] = 1;
    }

    for (var j = 0; j < data[i].tags.length; j++) {
      if (tagsPool[data[i].tags[j]]) {
        tagsPool[data[i].tags[j]] += 1;
      } else {
        tagsPool[data[i].tags[j]] = 1;
      }
    }
  }
  const brands = Object.entries(brandsPool).map((item) => ({
    name: item[0],
    count: item[1],
  }));

  const tags = Object.entries(tagsPool).map((item) => ({
    name: item[0],
    count: item[1],
  }));

  const itemTypes = Object.entries(itemTypesPool).map((item) => ({
    name: item[0],
    count: item[1],
  }));

  const pageIndex = (page - 1) * perPage;
  const items = data.slice(pageIndex, pageIndex + perPage);
  res.json({
    meta: {
      total: res.locals.data.length,
      pagination: paginate({
        totalCount: data.length,
        currentPage: page,
        perPage: perPage,
      }),
    },
    results: {
      brands: [{ name: "All", count: data.length }, ...brands],
      tags: [{ name: "All", count: data.length }, ...tags],
      itemTypes,
      items: items,
    },
  });
};

server.use(middlewares);
server.use(router);

server.listen(port);
