while true; do
cleanString=$(echo `curl -s http://producer.kuzu.fm/methods/getNicecastMeta | sed "s/^\"//g" | sed "s/\"$//g"` | sed "s/|/\\\r\\\n/g")
echo -e $cleanString > "/Users/kuzu/Library/Application Support/Nicecast/NowPlaying.txt"
sleep 1
done

