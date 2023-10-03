FILE=values.txt
if [ $# -eq 0 ]; then
  VAL=$(cat $FILE)
  if [ "$VAL" = "true" ]; then
    NEWVAL="false"
  elif [ "$VAL" = "false" ]; then
    NEWVAL="true"
  else
    echo "Invalid value in file: $VAL"
    exit 1
  fi
else
  if [ "$1" != "true" ] && [ "$1" != "false" ]; then
    echo "Invalid argument. Please provide 'true' or 'false'."
    exit 1
  fi
  NEWVAL="$1"
fi
echo $NEWVAL > $FILE
echo "Value written: $NEWVAL"