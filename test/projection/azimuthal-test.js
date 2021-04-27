import assert from "assert";
import * as d3 from "../../src/index.js";

it("azimuthal projections don't crash on the antipode", () => {
  for (const p of [
    d3.geoAzimuthalEqualArea()([180, 0]),
    d3.geoAzimuthalEqualArea()([-180, 0]),
    d3.geoAzimuthalEquidistant()([180, 0])
  ]) {
    assert(Math.abs(p[0]) < Infinity);
    assert(Math.abs(p[1]) < Infinity);
  }
});

