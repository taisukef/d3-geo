import assert from "assert";
import * as d3 from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("geoInterpolate(a, a) returns a", () => {
  assert.deepStrictEqual(d3.geoInterpolate([140.63289, -29.95101], [140.63289, -29.95101])(0.5), [140.63289, -29.95101]);
});

it("geoInterpolate(a, b) returns the expected values when a and b lie on the equator", () => {
  assertInDelta(d3.geoInterpolate([10, 0], [20, 0])(0.5), [15, 0], 1e-6);
});

it("geoInterpolate(a, b) returns the expected values when a and b lie on a meridian", () => {
  assertInDelta(d3.geoInterpolate([10, -20], [10, 40])(0.5), [10, 10], 1e-6);
});
