package com.radarwin.bifu.bm.task.base;

import com.radarwin.framework.util.StringUtil;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by josh on 15/8/5.
 */
public class TaskInvoker {

    private static Logger logger = LogManager.getLogger();

    public static Map<String, BaseTask> taskList = new HashMap<>();

    public static void start(String taskName) {
        if (StringUtil.isBlank(taskName)) {
            logger.error("name of task is empty");
        }

        boolean isRunning = true;
        try {
            isRunning = TaskHelper.existsPid(taskName);
        } catch (Exception e) {
            logger.error(ExceptionUtils.getStackTrace(e));
        }

        if (isRunning) {
            logger.info(taskName + " is still running and this round will be ignored");
            return;
        }

        try {
            beforeRun();

            logger.info(taskName + " start running!");

            if (taskList.containsKey(taskName)) {
                try {

                    taskList.get(taskName).start();
                } catch (Exception e) {
                    logger.error(ExceptionUtils.getStackTrace(e));
                }
            } else {
                logger.error("task named " + taskName + " not found");
            }

            logger.info(taskName + " end running!");
        } catch (Exception e) {
            logger.error(ExceptionUtils.getStackTrace(e));
        }

        afterRun(taskName);
    }

    public static void initContext() {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath*:*/applicationContext*.xml");
        taskList = applicationContext.getBeansOfType(BaseTask.class);
    }

    private static void beforeRun() throws Exception {
        initContext();
    }

    private static void afterRun(String taskName) {
        try {
            TaskHelper.deletePid(taskName);
        } catch (Exception e) {
            logger.error(ExceptionUtils.getStackTrace(e));
        }
    }
}
