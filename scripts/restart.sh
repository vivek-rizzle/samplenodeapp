# git checkout master
# git pull
# ./toggle.sh
# pm2 start index.js
sleep 30s
if [ -z "$1" ]; then
    arg="development"
else
    arg="$1"
fi
echo $arg
git checkout master
git pull
./updatehash.sh
pm2 start ../src/index.js -- "$arg"