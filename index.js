"use strict";

var url = require("url"),
    util = require("util");

module.exports = function(tilelive, options) {
  var MapBoxSource = function(uri, callback) {
    uri = url.parse(uri);

    return tilelive.load(util.format("tilejson+http://a.tiles.mapbox.com/v3%s.json", uri.path), callback);
  };

  MapBoxSource.registerProtocols = function(tilelive) {
    tilelive.protocols["mapbox:"] = this;
  };

  MapBoxSource.registerProtocols(tilelive);

  return MapBoxSource;
};
