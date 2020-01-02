import clipRectangle from "../clip/rectangle.js";
import identity from "../identity.js";
import {transformer} from "../transform.js";
import {fitExtent, fitSize, fitWidth, fitHeight} from "./fit.js";

export default function() {
  var k = 1, tx = 0, ty = 0, sx = 1, sy = 1, // scale, translate and reflect
      x0 = null, y0, x1, y1, // clip extent
      kx = 1, ky = 1,
      transform = transformer({
        point: function(x, y) {
          var p = projection([x, y])
          this.stream.point(p[0], p[1]);
        }
      }),
      postclip = identity,
      cache,
      cacheStream;

  function reset() {
    kx = k * sx;
    ky = k * sy;
    cache = cacheStream = null;
    return projection;
  }

  function projection (p) {
    return [p[0] * kx + tx, p[1] * ky + ty];
  }
  projection.invert = function(p) {
    return [(p[0] - tx) / kx, (p[1] - ty) / ky];
  };
  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transform(postclip(cacheStream = stream));
  };
  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };
  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, identity) : clipRectangle(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };
  projection.scale = function(_) {
    return arguments.length ? (k = +_, reset()) : k;
  };
  projection.translate = function(_) {
    return arguments.length ? (tx = +_[0], ty = +_[1], reset()) : [tx, ty];
  }
  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, reset()) : sx < 0;
  };
  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, reset()) : sy < 0;
  };
  projection.fitExtent = function(extent, object) {
    return fitExtent(projection, extent, object);
  };
  projection.fitSize = function(size, object) {
    return fitSize(projection, size, object);
  };
  projection.fitWidth = function(width, object) {
    return fitWidth(projection, width, object);
  };
  projection.fitHeight = function(height, object) {
    return fitHeight(projection, height, object);
  };

  return projection;
}
