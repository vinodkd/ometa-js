OMetaJS: vinodkd's fork
========================

My fork of Alex Warth's OMetaJS intends to:

- Arrange the files a bit more logically; move docs to a docs folder and so forth
- Make generic "launchers". The default launchers (ometa-rhino.js and oshell) are not generic enough to be used as an executable.
- Add in the Grammars from the website's projects directory for easy reference.
- Make distributable versions of OMetaJS for:
	- Rhino
	- node (if existing forks/efforts are not usable)
	- v8 (if I find use for such a version)
  
Alex's original readme is in the docs.

Why another fork
----------------
I looked at the current forks of OMetaJS on github before deciding to fork the original. Of all, veged's fork was very close to what I wanted : the code re-organization was already done and some tests were added, even. Unfortunately, however, he'd also refactored a lot of code which I was not sure I wanted to take on.

My fork is primarily to make OMetaJS easier to use for language projects; not necessarily to change OMetaJS itself. 

Caveats
-------

- I'm moving files first, adding grammars and making the rhino distro - in that order. Bits of the original OMetaJS codebase (like Worlds or the Workspace) might not work while I'm doing this.
- Not all grammars from the OMetaJS website have been copied over; only those that I thought would be relevant to using OMetaJS to build my own grammars. Also, the files are a point-in-time snapshot and may not work in practice. As I try to use these grammars in creating my own, I might go back to the older versions if the snapshot versions are broken.

Status
------

- Reorganized files into:
	- `bin`: containing the launchers; one each for Rhino, v8 and node.
		- `bin/web`: containing the original web version of OMetaJS. Most probably doesnt work now.
	- `doc`: containing the original documents from Alex
	- `lib`: containing the original source. In typical scripting language fashion the source code is contained in `lib`
	- `src`: containing the original v8 plugin source
- Added a `samples` directory and copied over sample grammars from the tinlizzie site for reference
- Created a generic launcher that uses Rhino as a default. This requires setting 3 shell variables:
	- `$RHINO_INSTALL_DIR`: Where Rhino is installed
	- `$OMETAJS_INSTALL_DIR`: Where OMetaJS is installed
	- `$OMETAJS_RUNTIME`: Which denotes the JS runtime to use. Currently supports only `rhino`, but will support `v8` and `node` eventually.


