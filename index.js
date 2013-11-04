"use strict";

var url = require("url"),
    util = require("util");

var HttpSource = require("tilelive-http"),
    TileJSON = require("TileJSON");

var MapBoxSource = function(uri, callback) {
  uri = url.parse(uri);

  return new TileJSON(util.format("http://a.tiles.mapbox.com/v3%s.json", uri.path),
                      function(err, data) {
    if (err) {
      return callback(err);
    }

    this.data = data.data;

    return HttpSource.call(this, this.data.tiles[0], callback);
  }.bind(this));
};

util.inherits(MapBoxSource, HttpSource);

MapBoxSource.prototype.getInfo = function(callback) {
  return callback(null, this.data);
};

MapBoxSource.registerProtocols = function(tilelive) {
  tilelive.protocols["mapbox:"] = this;
};

module.exports = MapBoxSource;
