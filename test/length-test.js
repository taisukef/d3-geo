import * as d3 from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("geoLength(Point) returns zero", () => {
  assertInDelta(d3.geoLength({type: "Point", coordinates: [0, 0]}), 0, 1e-6);
});

it("geoLength(MultiPoint) returns zero", () => {
  assertInDelta(d3.geoLength({type: "MultiPoint", coordinates: [[0, 1], [2, 3]]}), 0, 1e-6);
});

it("geoLength(LineString) returns the sum of its great-arc segments", () => {
  assertInDelta(d3.geoLength({type: "LineString", coordinates: [[-45, 0], [45, 0]]}), Math.PI / 2, 1e-6);
  assertInDelta(d3.geoLength({type: "LineString", coordinates: [[-45, 0], [-30, 0], [-15, 0], [0, 0]]}), Math.PI / 4, 1e-6);
});

it("geoLength(MultiLineString) returns the sum of its great-arc segments", () => {
  assertInDelta(d3.geoLength({type: "MultiLineString", coordinates: [[[-45, 0], [-30, 0]], [[-15, 0], [0, 0]]]}), Math.PI / 6, 1e-6);
});

it("geoLength(Polygon) returns the length of its perimeter", () => {
  assertInDelta(d3.geoLength({type: "Polygon", coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]]}), 0.157008, 1e-6);
});

it("geoLength(Polygon) returns the length of its perimeter, including holes", () => {
  assertInDelta(d3.geoLength({type: "Polygon", coordinates: [[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]], [[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]}), 0.209354, 1e-6);
});

it("geoLength(MultiPolygon) returns the summed length of the perimeters", () => {
  assertInDelta(d3.geoLength({type: "MultiPolygon", coordinates: [[[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]]]}), 0.157008, 1e-6);
  assertInDelta(d3.geoLength({type: "MultiPolygon", coordinates: [[[[0, 0], [3, 0], [3, 3], [0, 3], [0, 0]]], [[[1, 1], [2, 1], [2, 2], [1, 2], [1, 1]]]]}), 0.209354, 1e-6);
});

it("geoLength(FeatureCollection) returns the sum of its features’ lengths", () => {
  assertInDelta(d3.geoLength({
    type: "FeatureCollection", features: [
      {type: "Feature", geometry: {type: "LineString", coordinates: [[-45, 0], [0, 0]]}},
      {type: "Feature", geometry: {type: "LineString", coordinates: [[0, 0], [45, 0]]}}
    ]
  }), Math.PI / 2, 1e-6);
});

it("geoLength(GeometryCollection) returns the sum of its geometries’ lengths", () => {
  assertInDelta(d3.geoLength({
    type: "GeometryCollection", geometries: [
      {type: "GeometryCollection", geometries: [{type: "LineString", coordinates: [[-45, 0], [0, 0]]}]},
      {type: "LineString", coordinates: [[0, 0], [45, 0]]}
    ]
  }), Math.PI / 2, 1e-6);
});
