#!/bin/bash
# linkscheck.sh
function usage {
  echo "Usage: linkscheck.sh url"
  echo "Prints URLs of web pages with broken links"
	echo "Uses wget2 instead of wget when available for super fast processing"
  echo "Examples:"
  echo "linkscheck.sh https://docs.pachyderm.com"
}
# process wget2 output
# extract http error lines with paths
# match each error path to its source webpage
# print source page url and broken link
function process_wget2_output {
  local wgetoutfile=$1
	echo "Process wget2 output file $wgetoutfile"
  echo "Report bad links..."
  echo
# pass http error links from wget2 output to awk on stdin
# "HTTP ERROR response 404  [https://docs.pachyderm.com/concepts/data-concepts/]"
  grep "^HTTP ERROR response 404 " $wgetoutfile |
  grep -o "http[^]]*" |
  awk '
# collect bad links by paths
FILENAME == "-" && /^http/ {
  badlink = $0
  badpath = gensub("^https?://[^/]*", "", 1, badlink)
  badpaths[badpath]["link"] = badlink
	next
}
$2 != "[FRAME" {
  next
}
# set frame id
$2 == "[FRAME" {
  frame = gensub(/.$/, "", 1, $3)
}
# track links by frame id
# last path by frame
$5 == ":path:" {
  path = $6
  paths[frame] = path
	next
}
# match source page to path by frame id
$5 == "referer:" {
  referer = $6
  path = paths[frame]
# collect pairs of page and broken link by path
  referers[path][referer]
	next
}
# print report
END {
  print "page", "broken_link"
  for(path in badpaths) {
    for(page in referers[path]) {
      print page, badpaths[path]["link"]
    }
  }
}
' - $wgetoutfile
}
function process_wget1_output {
  local wgetoutfile=$1
	echo "Process wget output file $wgetoutfile"
  echo "Report bad links..."
  echo
# pass list of http broken links from end of wget output to awk on stdin
	sed -En '/^Found [0-9]+ broken links.$/, $ {/^http/p}' $wgetoutfile |
  awk '
# collect bad links by paths
FILENAME == "-" && /^http/ {
  badlink = $0
  badpath = gensub("^https?://[^/]*", "", 1, badlink)
  badpaths[badpath]["link"] = badlink
	next
}
# "HEAD /2.1.x/getting-started/local-deploy/docker/ HTTP/1.1^M"
$1 == "HEAD" {
  path = $2
  next
}
# "Referer: https://docs.pachyderm.com/2.4.x/getting-started/local-deploy/docker/^M"
$1 == "Referer:" {
  referer = gensub(/\r$/, "", 1, $2)
  referers[path][referer]
  next
}
# print report
END {
  print "page", "broken_link"
  for(path in badpaths) {
    for(page in referers[path]) {
      print page, badpaths[path]["link"]
    }
  }
}
' - $wgetoutfile
}
if (($# < 1)); then
  echo >&2 usage
  exit 1
fi
url=$1
wgetoutfile=wgetout.txt
num_threads=5
request_interval_secs=0.01
echo "Check links at url $url"
# wget options
# --spider to only check links with HEAD requests and not download pages
# --debug to get source web page url
# -w for delayed http requests
# -r for recursive
# -np to prevent retrieval above given url
# -p to check all links needed for each page
# --span-hosts to check links across domains
# -l to limit recursion depth
# -D to check cross-domain links
# prefer wget2 over original wget
# wget2 is much much faster and has nicer options
if type wget2 >/dev/null; then
  echo "Run wget2 with output to file $wgetoutfile"
  time wget2 --spider --debug -e robots=off -w $request_interval_secs --random-wait -r -l 0 -np -p --max-threads $num_threads $wget2_options $url >$wgetoutfile 2>&1
  echo "Finished wget2"
  process_wget2_output $wgetoutfile
  exit
fi
if type wget >/dev/null; then
  echo "Please install wget2 for much faster performance"
  echo "Run wget as fallback with output to file $wgetoutfile"
  time wget --spider --debug -e robots=off -w $request_interval_secs --random-wait -r -l 0 -np -p $url >$wgetoutfile 2>&1
  echo "Finished wget"
  process_wget1_output $wgetoutfile
  exit
fi
echo >&2 "Please install wget2 or wget for linkscheck.sh to check links"
exit 2