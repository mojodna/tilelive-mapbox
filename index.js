"use strict";

var assert = require("assert"),
    url = require("url"),
    util = require("util");

module.exports = function(tilelive, options) {
  var MapBoxSource = function(uri, callback) {
    uri = url.parse(uri, true);
    var accessToken = uri.query.access_token || process.env.MAPBOX_ACCESS_TOKEN;

    if (!accessToken) {
      return callback(new Error("A Mapbox access accessToken is required. `export MAPBOX_ACCESS_TOKEN=...` to set."));
    }

    return tilelive.load(util.format("tilejson+http://a.tiles.mapbox.com/v4%s.json?access_token=%s", uri.path, accessToken), callback);
  };

  MapBoxSource.registerProtocols = function(tilelive) {
    tilelive.protocols["mapbox:"] = this;
  };

  MapBoxSource.registerProtocols(tilelive);

  return MapBoxSource;
};
