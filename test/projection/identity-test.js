var tape = require("tape"),
    d3 = require("../../");

require("./projectionEqual");

tape("identity(point) returns the point", function(test) {
  var identity = d3.geoIdentity().translate([0, 0]).scale(1);
  test.projectionEqual(identity, [   0,   0], [   0,   0]);
  test.projectionEqual(identity, [-180,   0], [-180,   0]);
  test.projectionEqual(identity, [ 180,   0], [ 180,   0]);
  test.projectionEqual(identity, [  30,  30], [  30,  30]);
  test.end();
});


tape("identity(point).scale(…).translate(…) returns the point", function(test) {
  var identity = d3.geoIdentity().translate([100, 10]).scale(2);
  test.projectionEqual(identity, [   0,   0], [ 100,  10]);
  test.projectionEqual(identity, [-180,   0], [-260,  10]);
  test.projectionEqual(identity, [ 180,   0], [ 460,  10]);
  test.projectionEqual(identity, [  30,  30], [ 160,  70]);
  test.end();
});