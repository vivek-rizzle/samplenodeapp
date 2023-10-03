#!/bin/bash

FILE=values.txt

# Read current value
VAL=$(cat $FILE)

# Toggle value  
if [ "$VAL" = "true" ]; then
  NEWVAL="false"
elif [ "$VAL" = "false" ]; then
  NEWVAL="true"
else
  echo "Invalid value in file: $VAL"
  exit 1
fi

# Write new value 
echo $NEWVAL > $FILE

echo "Toggled value to: $NEWVAL"