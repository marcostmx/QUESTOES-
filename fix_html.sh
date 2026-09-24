#!/bin/bash
awk '
/<!-- SRS VIEW -->/ {
    print "             </div>"
    print $0
    next
}
/<\/main>/ {
    # Skip one </div> before </main> because we moved it up
    getline
    print "</main>"
    print $0
    next
}
{ print $0 }
' index.html > index2.html
