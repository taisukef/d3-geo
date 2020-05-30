var tape = require("tape"),
    d3 = require("../../");

require("../pathEqual");

tape("azimuthal projections don't crash on the antipode", function(test) {
  for (const p of [
    d3.geoAzimuthalEqualArea()([0,180]),
    d3.geoAzimuthalEqualArea()([0,-180]),
    d3.geoAzimuthalEquidistant()([0,180])
  ]) {
    test.assert(Math.abs(p[0]) < Infinity);
    test.assert(Math.abs(p[1]) < Infinity);
  };
  test.end();
});

