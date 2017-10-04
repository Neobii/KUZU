while true
nc -l -p 9876 > myFile
cat myFile
#curl --data "param1=value1&param2=value2" http://hostname/resource
#curl -X POST 'https://producer.kuzu.fm/insertTrack/' 
#-H 'X-Api-Key:{2466d11ec039670c7474d5d6d557668735c53a6f8c74d61' -i 
#-G -d 'policy_id=98489'
#curl "producer.kuzu.fm/methods/insertTrack"
#curl -d key1=value1 -d key2=value2 <URL>
