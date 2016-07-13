import sys
import os
import time
import datetime

plugs = [['74DA3822C793','0987','89','67'],['74DA3822C797','0987','90','68'],['74DA3822D1C1','0987','91','69'],['74DA3822D1BF','0987','92','70']]

plugid = sys.argv[1]

#retrieve energy now from smart plug 
ts = int(time.time())
res = os.popen("./edimanager " + plugs[plugid][0] +  " power -p " + plugs[plugid][1] + " | grep 'Power\|Current' | awk '!/^#/ {print $3}'").read()

info = res.split()
#print info
current = info[0]
power = info[1]

ts_date = datetime.datetime.fromtimestamp(ts).strftime('%Y-%m-%d')
ts_time = datetime.datetime.fromtimestamp(ts).strftime('%H:%M')
ts_hour = datetime.datetime.fromtimestamp(ts).strftime('%H')
ts_min = int(datetime.datetime.fromtimestamp(ts).strftime('%M'))
min15 = ts_min / 15
min6 = ts_min / 6
strsql = "INSERT INTO measurement(date,time,value,fkvariable,aggr6min,aggr15min,aggr60min) VALUES ('" + str(ts_date) + "','" + str(ts_time) + "'," + str(power) + "," + sp_power_id1 + "," + str(min6) + "," + str(min15) + "," + str(ts_hour) + ");"
print strsql

strsql = "INSERT INTO measurement(date,time,value,fkvariable,aggr6min,aggr15min,aggr60min) VALUES ('" + str(ts_date) + "','" + str(ts_time) + "'," + str(current) + "," + sp_current_id1  + "," + str(min6) + "," + str(min15) + "," + str(ts_hour) + ");"
print strsql
