package com.radarwin.bifu.bm.task.base;

import com.radarwin.bifu.bm.bean.DataBean;
import com.radarwin.bifu.bm.service.SynchronizeDataService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Lazy;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Created by ryan.zhu on 2016/4/28.
 */
@Component
@Lazy(false)
public class SynchronizeDataTask {
    private Logger logger = LogManager.getLogger(SynchronizeDataTask.class);

    @Autowired
    private SynchronizeDataService synchronizeDataService;

    /**
     * 每隔一分钟抓取
     */
//    @Scheduled(cron = "0 0/1 * * * ?")
//    @Scheduled(cron= "0/10 * * * * ?")
    public void syn() {
        List<String> list = synchronizeDataService.handleTableList();
        for (String tbl : list) {
            DataBean d = synchronizeDataService.getLast(tbl);
            if (d == null) {
                synchronizeDataService.initTable(tbl);
            } else {
                synchronizeDataService.addNewData(d, tbl);
            }
        }
    }

    public static void main(String[] args) {
        ApplicationContext applicationContext = new ClassPathXmlApplicationContext("classpath*:*/applicationContext*.xml");
    }
}
