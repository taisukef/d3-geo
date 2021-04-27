import assert from "assert";
import * as d3 from "../src/index.js";
import {assertInDelta} from "./asserts.js";

it("geoDistance(a, b) computes the great-arc distance in radians between the two points a and b", () => {
  assert.strictEqual(d3.geoDistance([0, 0], [0, 0]), 0);
  assertInDelta(d3.geoDistance([118 + 24 / 60, 33 + 57 / 60], [73 + 47 / 60, 40 + 38 / 60]), 3973 / 6371, 0.5);
});

it("geoDistance(a, b) correctly computes small distances", () => {
  assert(d3.geoDistance([0, 0], [0, 1e-12]) > 0);
});
