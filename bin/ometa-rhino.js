var ometaloc = arguments[0];

ometalibs= ometaloc + "lib/";

load(ometalibs + "lib.js");
load(ometalibs + "ometa-base.js");
load(ometalibs + "parser.js");
load(ometalibs + "bs-js-compiler.js");
load(ometalibs + "bs-ometa-compiler.js");
load(ometalibs + "bs-ometa-optimizer.js");
load(ometalibs + "bs-ometa-js-compiler.js");
load(ometalibs + "ext/json2.js");

var grammar  = readFile(arguments[1]);
var rule     = arguments[2];
var srcType  = arguments[3];
var srcTxt   = readFile(arguments[4]);

var langtoolchain = translateCode(grammar);
eval(langtoolchain);

// really kludge-y way of getting the parser's name.
// todo: figure out how to use omet-base.js's createInstance instead
var ometaObj = langtoolchain.substr(0,langtoolchain.indexOf("="));
var fnToCall = srcType == "source" ? "matchAll" : "match";

var src;
(srcType == "source") ? src = srcTxt : eval('src = ' + srcTxt +';');

eval("tree = " + ometaObj + "." + fnToCall + "(src,rule,undefined,matchFailed)");

// the stringify is needed if the output is to be fed back into ometa. 
// normal output results in the object becoming an un-eval-able string.
// output in json format resolves that issue.
// note that the assumption here is that string input => ast output and vice versa.

print((srcType == "source") ? JSON.stringify(tree) : tree );

function translateCode(s) {
  tree = BSOMetaJSParser.matchAll(s, "topLevel", undefined, matchFailed)
  return BSOMetaJSTranslator.match(tree, "trans", undefined, matchFailed)
}

function matchFailed(grammar, errorPos) {
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
  print(msg.join('\n'));
}
