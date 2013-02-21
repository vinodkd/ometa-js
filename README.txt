My fork of Alex Warth's OMetaJS intends to:
  - Arrange the files a bit more logically; move docs to a docs folder and so forth
  - Make generic "launchers". The default launchers (like ometa-rhino) are not generic enough.
  - Add in the Grammars from the website's projects directory for easy reference.
  - Make distributable versions of OMetaJS for:
     - Rhino
     - node (if existing forks/efforts are not usable)
     - v8 (if I find use for such a version)
  
I looked at the current forks on github before deciding to fork the original. In particular, veged's fork was very interesting in that the directory moves were already done and tests were added. Unfortunately, however, he's also refactored a lot of code which I was not sure I wanted to take on.

My fork is primarily to make OMetaJS easier to use; not necessarily to change OMetaJS itself.

Caveats:
  - I'm moving files first, adding grammars and making the rhino distro - in that order. Bits of the original OMetaJS codebase (like Worlds or the Workspace) might not work while I'm doing this.
  - Not all grammars have been copied over; only those that I thought (from a brief look-see) would be relevant to using OMetaJS. Also, the files are a point-in-time snapshot and may not work in practice. As I try to use these grammars in creating my own, I might go back to the older versions if there are broken snapshots.

Alex's original readme continues below.
=========================================================================== 

The following files contain some important info:

* Not_Quite_JS.txt explains the difference between "real" JavaScript and
  the JavaScript that can be used in the OMeta/JS Workspace.

* Things_You_Should_Know.txt explains the differences between the original
  OMeta syntax (as it appeared in the DLS'07 paper) and the newer OMeta/js
  syntax.

* OMeta_Tutorial.txt contains a bunch of examples that show how OMeta
  can be used for pattern matching, parsing, etc.

Another good resource for OMeta programmers is the OMeta mailing list. To
subscribe, please visit:

    http://vpri.org/mailman/listinfo/ometa

And you can also browse the archives of the mailing list at:

    http://vpri.org/pipermail/ometa/

Cheers,
Alex 

