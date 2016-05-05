package com.radarwin.bifu.bm.task.base;

import com.radarwin.framework.util.PropertyReader;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.lang.management.ManagementFactory;

/**
 * Created by josh on 15/8/5.
 */
public final class TaskHelper {

    private final static String pidFilePrefix = PropertyReader.get("pid.filePrefix", "sysconfig.properties");

    private final static String pidFileSuffix = ".state";

    private final static String pidFileDirectory = PropertyReader.get("pid.fileDirectory", "sysconfig.properties");

    public static void addPid(File file) throws Exception {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file, true));
        bufferedWriter.write(getPid());
        bufferedWriter.close();
    }

    public static void deletePid(String taskName) throws Exception {
        String fileUrl = getBinParentPath() + pidFileDirectory;
        String fileName = pidFilePrefix + "_" + taskName + pidFileSuffix;

        File file = new File(fileUrl + File.separator + fileName);
        if (file.exists()) {
            file.delete();
        }
    }

    public static String getPid() {
        String name = ManagementFactory.getRuntimeMXBean().getName();
        String pid = name.split("@")[0];
        return pid;
    }

    public static String getBinParentPath() throws Exception {
        java.net.URL url = TaskInvoker.class.getProtectionDomain().getCodeSource().getLocation();
        String filePath = java.net.URLDecoder.decode(url.getPath(), "utf-8");

        if (filePath.endsWith(".jar")) {
            filePath = filePath.substring(0, filePath.lastIndexOf(File.separator));
            filePath = filePath.substring(0, filePath.lastIndexOf(File.separator));
            return filePath + File.separator;
        } else {
            return filePath;
        }
    }

    /**
     * pid文件格式
     *
     * @param taskName
     * @return
     */
    public static boolean existsPid(String taskName) throws Exception {

        String fileUrl = getBinParentPath() + pidFileDirectory;
        String fileName = pidFilePrefix + "_" + taskName + pidFileSuffix;

        File directory = new File(fileUrl);
        if (!directory.exists()) {
            directory.mkdirs();

            File file = new File(fileUrl + File.separator + fileName);
            if (!file.exists()) {
                file.createNewFile();
                addPid(file);
            }
            return false;
        } else {

            File file = new File(fileUrl + File.separator + fileName);
            if (!file.exists()) {
                file.createNewFile();
                addPid(file);
                return false;
            }
            return true;
        }
    }

    public static void addLogHome() throws Exception {
        String logHome = getBinParentPath() + "logs";
        System.setProperty("logHome", logHome);
    }
}
