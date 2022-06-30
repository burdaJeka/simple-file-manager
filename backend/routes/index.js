//point of all routes . Index.routes ;

const mainRoutes = require("./main");

module.exports = function (app) {
  mainRoutes(app);
};
