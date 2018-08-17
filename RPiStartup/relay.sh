#!/bin/sh
### BEGIN INIT INFO
# Provides: relay
# Required-Start:    $network $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start daemon at boot time
# Description:       Enable service provided by daemon. /etc/init.d/relay
### END INIT INFO
sleep 8
cd /home/pi/assistant-relay
forever start server/app.js
