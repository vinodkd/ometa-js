var ometaloc = arguments[0];

ometalibs= ometaloc + "lib/";

load(ometalibs + "lib.js");
load(ometalibs + "ometa-base.js");
load(ometalibs + "parser.js");
load(ometalibs + "bs-js-compiler.js");
load(ometalibs + "bs-ometa-compiler.js");
load(ometalibs + "bs-ometa-optimizer.js");
load(ometalibs + "bs-ometa-js-compiler.js");

matchFailed = function (grammar, errorPos) {
  var lines = grammar.input.lst.split('\n');
  var pos = 0, l = 0;
  var msg = ["Execution error: input matching failed at position: " + errorPos];

  while (pos < errorPos) {
    var line = lines[l], length = line.length;
    if (pos + length >= errorPos) {
      var c = errorPos - pos;
      msg.push("  line:" + (l + 1) + ", column:" + c);
      msg.push(line)
      // replicate str n times
      function replicate(str, n) {
        if (n < 1) return "";
        var t = [];
        for (var i=0; i<n; i++) t.push(str);
        return t.join('');
      }
      msg.push(replicate('-', c) + '^');
    }
    pos += length + 1;
    l++;
  }
  alert(msg.join('\n'));
}

alert = print

translateCode = function(s) {
  tree = BSOMetaJSParser.matchAll(s, "topLevel", undefined, matchFailed)
  return BSOMetaJSTranslator.match(tree, "trans", undefined, matchFailed)
}
var grammar  = readFile(arguments[1]);
var rule     = arguments[2];
var pgm      = readFile(arguments[3]);

var langtoolchain = translateCode(grammar);

eval(langtoolchain);
var tree = BSParser.matchAll(pgm,rule);
alert(tree);
