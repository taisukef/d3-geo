import assert from "assert";
import * as d3 from "../src/index.js";
import * as array from "d3-array";
import {assertInDelta} from "./asserts.js";

function stripes(a, b) {
  return {type: "Polygon", coordinates: [a, b].map(function(d, i) {
    const stripe = array.range(-180, 180, 0.1).map(function(x) { return [x, d]; });
    stripe.push(stripe[0]);
    return i ? stripe.reverse() : stripe;
  })};
}

it("area: Point", () => {
  assert.strictEqual(d3.geoArea({type: "Point", coordinates: [0, 0]}), 0);
});

it("area: MultiPoint", () => {
  assert.strictEqual(d3.geoArea({type: "MultiPoint", coordinates: [[0, 1], [2, 3]]}), 0);
});

it("area: LineString", () => {
  assert.strictEqual(d3.geoArea({type: "LineString", coordinates: [[0, 1], [2, 3]]}), 0);
});

it("area: MultiLineString", () => {
  assert.strictEqual(d3.geoArea({type: "MultiLineString", coordinates: [[[0, 1], [2, 3]], [[4, 5], [6, 7]]]}), 0);
});

it("area: Polygon - tiny", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[
    [-64.66070178517852, 18.33986913231323],
    [-64.66079715091509, 18.33994007490749],
    [-64.66074946804680, 18.33994007490749],
    [-64.66070178517852, 18.33986913231323]
  ]]}), 4.890516e-13, 1e-13);
});

it("area: Polygon - zero area", () => {
  assert.strictEqual(d3.geoArea({
    "type": "Polygon",
    "coordinates": [[
      [96.79142432523281, 5.262704519048153],
      [96.81065389253769, 5.272455576551362],
      [96.82988345984256, 5.272455576551362],
      [96.81065389253769, 5.272455576551362],
      [96.79142432523281, 5.262704519048153]
    ]]
  }), 0);
});

it("area: Polygon - semilune", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, 0]]]}), Math.PI / 2, 1e-6);
});

it("area: Polygon - lune", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [0, 90], [90, 0], [0, -90], [0, 0]]]}), Math.PI, 1e-6);
});

it("area: Polygon - hemispheres North", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]]}), 2 * Math.PI, 1e-6);
});

it("area: Polygon - hemispheres South", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]}), 2 * Math.PI, 1e-6);
});

it("area: Polygon - hemispheres East", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [0, 90], [180, 0], [0, -90], [0, 0]]]}), 2 * Math.PI, 1e-6);
});

it("area: Polygon - hemispheres West", () => {
  assertInDelta(d3.geoArea({type: "Polygon", coordinates: [[[0, 0], [0, -90], [180, 0], [0, 90], [0, 0]]]}), 2 * Math.PI, 1e-6);
});

it("area: Polygon - graticule outline sphere", () => {
  assertInDelta(d3.geoArea(d3.geoGraticule().extent([[-180, -90], [180, 90]]).outline()), 4 * Math.PI, 1e-5);
});

it("area: Polygon - graticule outline hemisphere", () => {
  assertInDelta(d3.geoArea(d3.geoGraticule().extent([[-180, 0], [180, 90]]).outline()), 2 * Math.PI, 1e-5);
});

it("area: Polygon - graticule outline semilune", () => {
  assertInDelta(d3.geoArea(d3.geoGraticule().extent([[0, 0], [90, 90]]).outline()), Math.PI / 2, 1e-5);
});

it("area: Polygon - circles hemisphere", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(90)()), 2 * Math.PI, 1e-5);
});

it("area: Polygon - circles 60°", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(60).precision(0.1)()), Math.PI, 1e-5);
});

it("area: Polygon - circles 60° North", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(60).precision(0.1).center([0, 90])()), Math.PI, 1e-5);
});

it("area: Polygon - circles 45°", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(45).precision(0.1)()), Math.PI * (2 - Math.SQRT2), 1e-5);
});

it("area: Polygon - circles 45° North", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(45).precision(0.1).center([0, 90])()), Math.PI * (2 - Math.SQRT2), 1e-5);
});

it("area: Polygon - circles 45° South", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(45).precision(0.1).center([0, -90])()), Math.PI * (2 - Math.SQRT2), 1e-5);
});

it("area: Polygon - circles 135°", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(135).precision(0.1)()), Math.PI * (2 + Math.SQRT2), 1e-5);
});

it("area: Polygon - circles 135° North", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(135).precision(0.1).center([0, 90])()), Math.PI * (2 + Math.SQRT2), 1e-5);
});

it("area: Polygon - circles 135° South", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(135).precision(0.1).center([0, -90])()), Math.PI * (2 + Math.SQRT2), 1e-5);
});

it("area: Polygon - circles tiny", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(1e-6).precision(0.1)()), 0, 1e-6);
});

it("area: Polygon - circles huge", () => {
  assertInDelta(d3.geoArea(d3.geoCircle().radius(180 - 1e-6).precision(0.1)()), 4 * Math.PI, 1e-6);
});

it("area: Polygon - circles 60° with 45° hole", () => {
  const circle = d3.geoCircle().precision(0.1);
  assertInDelta(d3.geoArea({
    type: "Polygon",
    coordinates: [
      circle.radius(60)().coordinates[0],
      circle.radius(45)().coordinates[0].reverse()
    ]
  }), Math.PI * (Math.SQRT2 - 1), 1e-5);
});

it("area: Polygon - circles 45° holes at [0°, 0°] and [0°, 90°]", () => {
  const circle = d3.geoCircle().precision(0.1).radius(45);
  assertInDelta(d3.geoArea({
    type: "Polygon",
    coordinates: [
      circle.center([0, 0])().coordinates[0].reverse(),
      circle.center([0, 90])().coordinates[0].reverse()
    ]
  }), Math.PI * 2 * Math.SQRT2, 1e-5);
});

it("area: Polygon - circles 45° holes at [0°, 90°] and [0°, 0°]", () => {
  const circle = d3.geoCircle().precision(0.1).radius(45);
  assertInDelta(d3.geoArea({
    type: "Polygon",
    coordinates: [
      circle.center([0, 90])().coordinates[0].reverse(),
      circle.center([0, 0])().coordinates[0].reverse()
    ]
  }), Math.PI * 2 * Math.SQRT2, 1e-5);
});

it("area: Polygon - stripes 45°, -45°", () => {
  assertInDelta(d3.geoArea(stripes(45, -45)), Math.PI * 2 * Math.SQRT2, 1e-5);
});

it("area: Polygon - stripes -45°, 45°", () => {
  assertInDelta(d3.geoArea(stripes(-45, 45)), Math.PI * 2 * (2 - Math.SQRT2), 1e-5);
});

it("area: Polygon - stripes 45°, 30°", () => {
  assertInDelta(d3.geoArea(stripes(45, 30)), Math.PI * (Math.SQRT2 - 1), 1e-5);
});

it("area: MultiPolygon two hemispheres", () => {
  assert.strictEqual(d3.geoArea({type: "MultiPolygon", coordinates: [
    [[[0, 0], [-90, 0], [180, 0], [90, 0], [0, 0]]],
    [[[0, 0], [90, 0], [180, 0], [-90, 0], [0, 0]]]
  ]}), 4 * Math.PI);
});

it("area: Sphere", () => {
  assert.strictEqual(d3.geoArea({type: "Sphere"}), 4 * Math.PI);
});

it("area: GeometryCollection", () => {
  assert.strictEqual(d3.geoArea({type: "GeometryCollection", geometries: [{type: "Sphere"}]}), 4 * Math.PI);
});

it("area: FeatureCollection", () => {
  assert.strictEqual(d3.geoArea({type: "FeatureCollection", features: [{type: "Feature", geometry: {type: "Sphere"}}]}), 4 * Math.PI);
});

it("area: Feature", () => {
  assert.strictEqual(d3.geoArea({type: "Feature", geometry: {type: "Sphere"}}), 4 * Math.PI);
});
