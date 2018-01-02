#!/bin/bash

while true;do
  data=$(nc -l -p 9876);
  IFS='|'
  json=""
  counter=0
  for item in $(echo "$data"); do
    item=`echo $item | sed -e 's|\"|\\\"|g'`
    if [ $counter -eq 0 ]
      then
        json="{\"artist\": \"$item\", "
    fi
    if [ $counter -eq 1 ]
      then
        json="$json\"songTitle\": \"$item\", "
    fi
    if [ $counter -eq 2 ]
      then
        json="$json\"album\": \"$item\", "
    fi
    if [ $counter -eq 3 ]
      then
        json="$json\"label\": \"$item\", "
    fi
    if [ $counter -eq 4 ]
      then
        json="$json\"trackLength\": \"$item\"}"
    fi
    counter=$((counter+1))
  done
  unset IFS
  echo $json
  #curl -X POST -H "Content-Type: application/json" -d "$data" "http://producer.kuzu.fm/methods/insertTrack" &
  #curl -X POST -H "Content-Type: application/json" -d "$data" "http://localhost:3000/methods/insertTrack" &
done