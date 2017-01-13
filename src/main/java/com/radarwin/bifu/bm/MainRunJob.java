package com.radarwin.bifu.bm;

import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * Created by duke on 16/7/9.
 */
public class MainRunJob {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath*:spring/applicationContext*.xml");
//        if ("runBalanceTask".equals(args[0])) {
//            System.out.println("Start BalanceTask");
//            applicationContext.getBean(HotWalletsAddressService.class).saveCountHotWallets();
//            System.out.println("End BalanceTask");
//            return;
//        }

        if (args != null && args.length > 1 && "-logHome".equals(args[0]) && args[1] != null && args[1].length() > 0) {
            System.setProperty("logHome", args[1]);
        }

        synchronized (MainRunJob.class) {
            try {
                MainRunJob.class.wait();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
