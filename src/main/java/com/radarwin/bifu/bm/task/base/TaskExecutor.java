package com.radarwin.bifu.bm.task.base;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 * Created by josh on 15/8/5.
 */
public class TaskExecutor {

    public static void main(String[] args) {

        try {
            TaskHelper.addLogHome();
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        Logger logger = LogManager.getLogger();

        if (args != null && args.length > 1) {
            String cmd = args[0];
            String taskName = args[1];

            switch (cmd) {
                case "start":
                    TaskInvoker.start(taskName);
                    break;
                default:
                    logger.error("command " + cmd + " not found");
            }
        } else {
            logger.error("two arguments are required to execute the task");
        }
    }
}
