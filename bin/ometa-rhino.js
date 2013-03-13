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

/* 
This whoel section is under construction
The idea was to take omet-rhino.js from betterscript and convert it into a generic one-step processor:
parse would be one step, compile would be another; which is currently combined in betterscript/ometa-rhino.
however, when i split the two, the parse seems to work fine, but the compile refuses to accept the output of the parse step
i've narrowed it down to this: if both the parse and compile are in the same session, the compile works.
splitting them up requires writing the output to file and reading it back. something is going on there.

when i figure it out, all hardcoded refs shoudl be removed, as should all the srctype elvises.
even better: figure out how to use createInstance.

idea: eval the source when its an object.
its almost working but there's issues in the eval 
FINALLY GOT IT WORKING BY MANUALLY CHANGING ONE.BSC: NEED TO SAVE THE OBJECT AS A REPARSEABLE OBJECT.
BEST BET: USE JSON
*/
var grammar  = readFile(arguments[1]);
var rule     = arguments[2];
var srcType  = arguments[3];
var srcTxt   = readFile(arguments[4]);
// alert(srcTxt);

var langtoolchain = translateCode(grammar);
eval(langtoolchain);

// really kludge-y way of getting the parser's name.
// todo: figure out how to use omet-base.js's createInstance instead
var ometaObj = langtoolchain.substr(0,langtoolchain.indexOf("="));
var fnToCall = srcType == "source" ? "matchAll" : "match";

var src;
(srcType == "source") ? src = srcTxt : eval('src = ' + srcTxt +';');

// alert(fnToCall);
//alert(src);
//alert("tree = " + ometaObj + "." + fnToCall + "(src,rule,undefined,matchFailed)");
eval("tree = " + ometaObj + "." + fnToCall + "(src,rule,undefined,matchFailed)");
//var tree = BSCompiler.match(src,rule,undefined,matchFailed);
alert((srcType == "source") ? JSON.stringify(tree) : tree );

// var ast = BSParser.matchAll(src,"compilationUnit");
// alert(ast);
// var bsc = readFile("/Users/vinodkd/projects/betterscript/one.bsc");
// alert("printing file output");
// alert(bsc);
// alert("ast done. now compiling\n");

// var code = BSCompiler.match(ast, "ast");
// alert(code);
