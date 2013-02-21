var ometaloc = arguments[0]

load(ometaloc + "lib.js")
load(ometaloc + "ometa-base.js")
load(ometaloc + "parser.js")
load(ometaloc + "bs-js-compiler.js")
load(ometaloc + "bs-ometa-compiler.js")
load(ometaloc + "bs-ometa-optimizer.js")
load(ometaloc + "bs-ometa-js-compiler.js")

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
var compiler = readFile(arguments[2]);
var pgm      = readFile(arguments[3]);

var langsrc = grammar + "\n" + compiler;
var langtoolchain = translateCode(langsrc);

//print(compiledUnit);
eval(langtoolchain);
var ast = BSParser.matchAll(pgm,"compilationUnit");
alert(ast);
alert("ast done. now compiling\n");

var code = BSCompiler.match(ast, "ast");
alert(code);
