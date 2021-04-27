export function testContext() {
  let buffer = [];
  return {
    arc: function(x, y, r) { buffer.push({type: "arc", x: Math.round(x), y: Math.round(y), r: r}); },
    moveTo: function(x, y) { buffer.push({type: "moveTo", x: Math.round(x), y: Math.round(y)}); },
    lineTo: function(x, y) { buffer.push({type: "lineTo", x: Math.round(x), y: Math.round(y)}); },
    closePath: function() { buffer.push({type: "closePath"}); },
    result: function() { let result = buffer; buffer = []; return result; }
  };
}
