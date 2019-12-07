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


tape("identity(point).scale(…).translate(…) returns the transformed point", function(test) {
  var identity = d3.geoIdentity().translate([100, 10]).scale(2);
  test.projectionEqual(identity, [   0,   0], [ 100,  10]);
  test.projectionEqual(identity, [-180,   0], [-260,  10]);
  test.projectionEqual(identity, [ 180,   0], [ 460,  10]);
  test.projectionEqual(identity, [  30,  30], [ 160,  70]);
  test.end();
});


tape("identity(point).reflectX(…) and reflectY() return the transformed point", function(test) {
  var identity = d3.geoIdentity().translate([100, 10]).scale(2)
    .reflectX(false).reflectY(false);
  test.projectionEqual(identity, [   3,   7], [ 106,  24]);
  test.projectionEqual(identity.reflectX(true), [   3,   7], [ 94,  24]);
  test.projectionEqual(identity.reflectY(true), [   3,   7], [ 94,  -4]);
  test.projectionEqual(identity.reflectX(false), [   3,   7], [ 106,  -4]);
  test.projectionEqual(identity.reflectY(false), [   3,   7], [ 106,  24]);
  test.end();
});