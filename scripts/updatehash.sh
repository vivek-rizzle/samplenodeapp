#!/bin/bash
cd ..
# Set script variables
prop_file="deployment.properties"
# Validate prop file exists
if [ ! -f "$prop_file" ]; then

    if [ $# -eq 1 ]; then
        # File doesn't exist, new hash provided
        echo "CURRENT_HASH=" >>"$prop_file"
        echo "NEW_HASH=$1" >>"$prop_file"
        echo "Created $prop_file with hash $1"

    else
        # File doesn't exist, no new hash
        current_hash=$(git rev-parse HEAD)
        echo "CURRENT_HASH=$current_hash" >>"$prop_file"
        echo "NEW_HASH=$current_hash" >>"$prop_file"
        echo "Created $prop_file with hash $current_hash"

    fi
    exit 0

fi
# Backup properties file
cp "$prop_file" "$prop_file.bak"

# Update hash value
if [ $# -eq 1 ]; then
    new_hash="$1"
    sed -i '' "s/^NEW_HASH=.*/NEW_HASH=$new_hash/" $prop_file
    echo "Successfully updated new hash in $prop_file"
else
    current_hash=$(git rev-parse HEAD)
    sed -i '' "s/^CURRENT_HASH=.*/CURRENT_HASH=$current_hash/" "$prop_file"
    echo "Successfully updated current hash in $prop_file"
fi

