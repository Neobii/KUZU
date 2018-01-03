curl http://localhost:3000/methods/getNicecastMeta | sed "s/|/\\r\\n/g" | sed "s/\"//g" > myFile.txt
