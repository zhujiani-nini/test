#!/bin/sh

# -s        [taskName] start run taskName immediately
# -p        [taskName or all]  stop the running or all job
# -a        [taskName] combine use with -c option
# -c        [cron expression */1 * * * *] add cron expression to crontab combine with -a option
# -r        [taskName or all] remove the task or all from crontab
# -h        help information

JAVA_OPTS="-Xms256M -Xmx256M -XX:PermSize=256M -XX:MaxPermSize=256M -Xmn90M"

if [ ! "${JOB_HOME}" ]
then
    echo "please specify a JOB_HOME"
    exit 0
fi

jobHome=${JOB_HOME}
jarFile=${jobHome}/bin/job.jar

pidDir=${jobHome}/pid
pidPrefix=pid
pidSuffix=.state

cronDirName=cron
cronDirPath=${jobHome}/${cronDirName}

cronFileName=cron.state
cronFilePath=${cronDirPath}/${cronFileName}

taskName=
cron=

# stop the running task
stop_single()
{
    pidFile="${pidDir}/${pidPrefix}_${taskName}${pidSuffix}"
    if [ ! -f ${pidFile} ]
    then
        echo "${pidFile} not found , stop error!"
    else
        row=$(cat "${pidFile}" | head -1)
        if [ ${row} ]
        then
            echo "stop ${taskName}!"
            kill -9 ${row}
            rm -rf ${pidFile}
        else
            echo "pid not found in ${pidFile}"
        fi
    fi
    exit 0
}

# remove cron from crontab
remove_single()
{
    if [ ! -f "${cronFilePath}" ]
    then
        echo "${cronFilePath} not exists , remove error!"
    else
        row=$(cat "${cronFilePath}" | grep "start ${taskName}" | head -1)

        if [ ! "${row}" ]
        then
            echo "cron of ${taskName} not defined in ${cronFilePath} , remove error"
        else
            # which system version max or linux
            # sed command in mac os are different from linux
            system_version=$(uname -o)
            if [ "${system_version}" == "GNU/Linux" ]
            then
                sed -i "/start ${taskName}/d" "${cronFilePath}"
            else
                sed -i "" "/start ${taskName}/d" "${cronFilePath}"
            fi
            crontab "${cronFilePath}"
        fi
    fi
    exit 0
}

# stop all the running task
stop_all()
{
    if [ ! -d ${pidDir} ]
    then
        echo "${pidDir} not exists , stop error"
        exit 0
    fi

    for file in ${pidDir}/*
    do
         if test -f ${file}
         then
            row=$(cat "${file}" | head -1)
            if [ ${row} ]
            then
                echo "stop ${file:5}!"
                kill -9 ${row}
                rm -rf ${file}
            else
                echo "pid not found in ${file}"
            fi
         fi
    done
    exit 0
}

remove_all()
{
    if [ -f ${cronFilePath} ]
    then
        rm -rf "${cronFilePath}"
        crontab -r
    else
        echo "${cronFilePath} not exists , remove all error"
    fi
    exit 0
}

# java ${JAVA_OPTS} -jar jarFile start taskName
start()
{
   if [ ! "${JAVA_HOME}" ]
   then
       echo "please export JAVA_HOME to classpath first"
   else
       echo "$taskName will start"
       java ${JAVA_OPTS} -jar ${jarFile} start "${taskName}"
   fi
   exit 0
}

# stop single task or all task
stop()
{
    if [ ${taskName} == "all" ]
    then
        stop_all;
    else
        stop_single;
    fi
}

# remove single cron or all cron
remove()
{
    if [ ${taskName} == "all" ]
    then
        remove_all;
    else
        remove_single;
    fi
}

# add cron to crontab
addCron()
{
    if [ ! "${JAVA_HOME}" ]
    then
        echo "please export JAVA_HOME to classpath first"
        exit 0
    fi

    if [ ! -d ${cronDirPath} ]
    then
        cd ${jobHome}
        mkdir ${cronDirName}

        echo "${cron} ${JAVA_HOME}/bin/java ${JAVA_OPTS} -jar ${jarFile} start $taskName " >> ${cronFilePath}
        crontab "${cronFilePath}"
    else
        if [ -f ${cronFilePath} ]
        then
            row=$(cat "${cronFilePath}" | grep "start ${taskName}" | head -1)

            if [ "${row}" ]
            then
                echo "${taskName} already exists in cron!"
                echo "please exec ./job.sh -r taskName command to remove from cron then add again!"
            else
                echo "${cron} ${JAVA_HOME}/bin/java ${JAVA_OPTS} -jar ${jarFile} start $taskName " >> ${cronFilePath}
                crontab "${cronFilePath}"
            fi
        else
            echo "${cron} ${JAVA_HOME}/bin/java ${JAVA_OPTS} -jar ${jarFile} start $taskName " >> ${cronFilePath}
            crontab "${cronFilePath}"
        fi
    fi
    exit 0
}

# show help information
show_help()
{
    echo -e "\t-------------------------------------------------------------------\n"
    echo -e "\t -s"
    echo -e "\t\t taskName or all"
    echo -e "\t\t start run the specified task immediately\n"
    echo -e "\t -p"
    echo -e "\t\t taskName or all"
    echo -e "\t\t stop the specified task or all task immediately"
    echo -e "\t\t use -p all to stop all the running task\n"
    echo -e "\t -r"
    echo -e "\t\t taskName or all"
    echo -e "\t\t remove the specified task or all task from crontab"
    echo -e "\t\t use -r all to remove all the cron from crontab\n"
    echo -e "\t -a"
    echo -e "\t\t taskName"
    echo -e "\t\t add the specified task with cron expression to crontab"
    echo -e "\t\t conbine use with -c \n"
    echo -e "\t -c"
    echo -e "\t\t cron expression"
    echo -e "\t\t specify the task of cron expression"
    echo -e "\t\t combine use with -a \n"
    echo -e "\t-------------------------------------------------------------------\n"
}

while getopts "s:p:a:c:r:h" arg
do
    case ${arg} in
         s)
            taskName=$OPTARG
            start;
            ;;
         p)
            taskName=$OPTARG
            stop;
            ;;
         a)
            taskName=$OPTARG
            ;;
         c)
            cron=$OPTARG
            ;;
         r)
            taskName=$OPTARG
            remove;
            ;;
         h)
            show_help;
            ;;
         ?)
            echo "unknown options"
            ;;
    esac
done

if [ "$taskName" ] && [ ! "$cron" ]
then
    echo "please use -c to specify cron expression"
    exit 0
fi

if [ ! "$taskName" ] && [ "$cron" ]
then
    echo "please combine with -a to use"
    exit 0
fi

if [ "$taskName" ] && [ "$cron" ]
then
    addCron;
fi


