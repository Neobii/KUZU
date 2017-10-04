#!/bin/bash

while true;do
  data=$(nc -l -p 9876);
  curl -X POST -H "Content-Type: application/json" -d "$data" "http://producer.kuzu.fm/methods/insertTrack" &
  #curl -X POST -H "Content-Type: application/json" -d "$data" "http://localhost:3000/methods/insertTrack" &
done
