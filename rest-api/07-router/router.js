function notFoundRoute(req, res) {
  res.status(404).send('Resource not found');
}

function newRoute(method, path, handler, routeTable) {
  let methodRoutes = routeTable[method];
  if (!methodRoutes) {
    methodRoutes = {};
    routeTable[method] = methodRoutes;
  }
  methodRoutes[path] = handler;

  return this;
}

function routerBuilder(routeTable) {
  return {
    get: function(path, handler) {
      return newRoute.call(this, 'get', path, handler, routeTable);
    },
    post: function(path, handler) {
      return newRoute.call(this, 'post', path, handler, routeTable);
    },
    put: function(path, handler) {
      return newRoute.call(this, 'put', path, handler, routeTable);
    },
    delete: function(path, handler) {
      return newRoute.call(this, 'delete', path, handler, routeTable);
    },
    patch: function(path, handler) {
      return newRoute.call(this, 'patch', path, handler, routeTable);
    }
  };
}

function router() {
  const routeTable = {};
  const builder = new routerBuilder(routeTable);
  return {
    builder: () => builder,
    match: (method, path) => {
      return routeTable[method.toLowerCase()]?.[path] ?? notFoundRoute
    },
    printRoutes: () => console.log(routeTable)
  };
}

module.exports = router();