import assert from "assert";
import * as d3 from "../../src/index.js";

it("geoPath.measure(…) of a Point", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "Point",
    coordinates: [0, 0]
  }), 0);
});

it("geoPath.measure(…) of a MultiPoint", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "Point",
    coordinates: [[0, 0], [0, 1], [1, 1], [1, 0]]
  }), 0);
});

it("geoPath.measure(…) of a LineString", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "LineString",
    coordinates: [[0, 0], [0, 1], [1, 1], [1, 0]]
  }), 3);
});

it("geoPath.measure(…) of a MultiLineString", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "MultiLineString",
    coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0]]]
  }), 3);
});

it("geoPath.measure(…) of a Polygon", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "Polygon",
    coordinates: [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]
  }), 4);
});

it("geoPath.measure(…) of a Polygon with a hole", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "Polygon",
    coordinates: [[[-1, -1], [-1, 2], [2, 2], [2, -1], [-1, -1]], [[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]
  }), 16);
});

it("geoPath.measure(…) of a MultiPolygon", () => {
  assert.strictEqual(d3.geoPath().measure({
    type: "MultiPolygon",
    coordinates: [[[[-1, -1], [-1, 2], [2, 2], [2, -1], [-1, -1]]], [[[0, 0], [0, 1], [1, 1], [1, 0], [0, 0]]]]
  }), 16);
});
