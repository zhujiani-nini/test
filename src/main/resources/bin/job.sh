#!/bin/sh

JAVA_OPTS="-server
           -XX:+AggressiveOpts
           -XX:+UseBiasedLocking
           -XX:+DisableExplicitGC
           -XX:+UseParNewGC
           -XX:+UseConcMarkSweepGC
           -XX:+CMSParallelRemarkEnabled
           -XX:+UseCMSCompactAtFullCollection
           -XX:LargePageSizeInBytes=64M
           -XX:+UseFastAccessorMethods
           -XX:+UseCMSInitiatingOccupancyOnly
           -XX:CMSInitiatingOccupancyFraction=40
           -Djava.awt.headless=true"

homeDir=$(cd `dirname $0`;cd ..;pwd)
logDir=log
logHome=${homeDir}/${logDir}
jarFile=$(cd `dirname $0`;pwd)/$(cd `dirname $0`;ls *.jar)

# java ${JAVA_OPTS} -jar jarFile -logHome xxxx
start()
{
   if [ ! "${JAVA_HOME}" ]
   then
       echo "Please export JAVA_HOME to classpath first"
   else
       pidCnt=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'END{print NR}')
       pid=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'NR==1{print $2}')

       if [ ${pidCnt} -ge 1 ]
       then
            echo "Job alreay started, pid:${pid}"
       else
            if [ ! -d ${logHome} ]
            then
               cd ${homeDir}
               mkdir ${logDir}
            fi
            echo "Job starting."

            nohup java ${JAVA_OPTS} -jar ${jarFile} -logHome "${logHome}" >> ${logHome}/job.out 2>&1 &

            startTime=$(date +%s)

            while [[ ${pidCnt} -lt 1 ]]
            do
                if [ $(($(date +%s)-${startTime})) -ge 10 ]
                then
                    echo "Wait 10s for Job start, this shell will exit, please use [ps -ef|grep java] to check whether started or not."
                    exit 0
                fi

                pidCnt=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'END{print NR}')

                if [ ${pidCnt} -ge 1 ]
                then
                  echo "Job started."
                  break
                fi
                sleep 1
            done
       fi
   fi
}

stop()
{
     pidCnt=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'END{print NR}')

     if [ ${pidCnt} -lt 1 ]
     then
           echo "Job already stopped."
     else
           pid=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'NR==1{print $2}')

           echo "Job stopping."

           kill ${pid}

           while [[ ${pidCnt} -ge 1 ]]
           do
                pidCnt=$(ps -ef|grep -v grep|grep ".*java.*-jar.*${jarFile}.*"|awk 'END{print NR}')
                sleep 1
           done

           echo "Job stopped."
     fi
}

case $1 in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        echo "Job restarting."
        stop
        start
        ;;
    *)
        echo "Please specified the option [start or stop or restart]"
        echo "Example ./job.sh start or ./job.sh stop or ./job.sh restart"
        ;;
esac