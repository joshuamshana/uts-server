git add .
git commit -am'{$1}'
git push -u origin master
bfast fs deploy -f
