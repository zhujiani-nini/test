package com.radarwin.bifu.bm.service.impl;

import com.radarwin.bifu.bm.bean.*;
import com.radarwin.bifu.bm.dao.SynchronizeDataDao;
import com.radarwin.bifu.bm.service.SynchronizeDataService;
import com.radarwin.bifu.bm.util.DateConvertUtil;
import com.radarwin.framework.cache.RedisCache;
import com.radarwin.framework.util.DateUtil;
import com.radarwin.framework.util.JsonUtil;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.LinkedBlockingQueue;

/**
 * Created by ryan on 2016/4/20.
 */
@Service
public class SynchronizeDataServiceImpl implements SynchronizeDataService {

    private Logger logger = LogManager.getLogger(SynchronizeDataServiceImpl.class);

    @Autowired
    private SynchronizeDataDao synchronizeDataDao;

    @Override
    public List<String> handleTableList() {
        List<String> handleList = new ArrayList<>();
        try {
            List sourceList = synchronizeDataDao.getAllTableNames();
            for (Object obj : sourceList) {
                handleList.add(obj.toString());
            }
        } catch (SQLException e) {
            logger.error(ExceptionUtils.getStackTrace(e));
        }
        return handleList;
    }

    @Override
    public DataBean getLast(String tbl) {
        try {
            int exist = synchronizeDataDao.checkTable(tbl);
            if (exist == 0) {
                synchronizeDataDao.createTable(tbl);
                return null;
            } else {
                return synchronizeDataDao.getLast(tbl);
            }
        } catch (SQLException e) {
            logger.error(ExceptionUtils.getStackTrace(e));
            return null;
        }
    }

    @Override
    public boolean initTable(String tbl) {
        List<Map<String, Object>> list = synchronizeDataDao.getSourceListByName(tbl);
        try {
            for (Map<String, Object> changeMap : list) {
                DataBean dataBean = new DataBean();
                if (changeMap.containsKey("longIndx")) {
                    dataBean.setLongindx(Double.valueOf(changeMap.get("longIndx").toString()));
                    dataBean.setShortindx(Double.valueOf(changeMap.get("shortIndx").toString()));
                }
                dataBean.setInfo(String.valueOf(changeMap.get("info")));
                dataBean.setIndx(Double.valueOf(changeMap.get("indx").toString()));
                dataBean.setDate(DateUtil.convertToDate(changeMap.get("date").toString(), DateUtil.YYYY_MM_DD_HH_MM_SS));
                String str = DateConvertUtil.dateToTimestamp(changeMap.get("date").toString());
                if (str == null) {
                    dataBean.setTimestamp(0l);
                } else {
                    dataBean.setTimestamp(Long.valueOf(DateConvertUtil.dateToTimestamp(changeMap.get("date").toString())));
                }
                synchronizeDataDao.save(dataBean, tbl);
            }
            return true;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean addNewData(DataBean dataBean, String tbl) {
        try {
            Double local = dataBean.getIndx();
            List<Map<String, Object>> hasList = this.getWithDateList(dataBean, tbl);
            if (hasList.size() == 1) {
                Map<String, Object> m = hasList.get(0);
                if (m.containsKey("longIndx")) {
                    dataBean.setLongindx(Double.valueOf(m.get("longIndx").toString()));
                    dataBean.setShortindx(Double.valueOf(m.get("shortIndx").toString()));
                }
                dataBean.setIndx(Double.valueOf(m.get("indx").toString()));
                dataBean.setInfo(String.valueOf(m.get("info")));
                String str = DateConvertUtil.dateToTimestamp(m.get("date").toString());
                if (str == null) {
                    dataBean.setTimestamp(0l);
                } else {
                    dataBean.setTimestamp(Long.valueOf(DateConvertUtil.dateToTimestamp(m.get("date").toString())));
                }
                if (dataBean.getIndx().compareTo(local) != 0) {
                    RedisCache.getInstance().publish(tbl, JsonUtil.objectToJson(dataBean));
                    synchronizeDataDao.update(dataBean, tbl);
                }

            }
            List<Map<String, Object>> list = synchronizeDataDao.getListByDate(dataBean.getDate(), tbl);
            for (int i = 0; i < list.size(); i++) {
                Map<String, Object> changeMap = list.get(i);
                if (changeMap.containsKey("longIndx")) {
                    dataBean.setLongindx(Double.valueOf(changeMap.get("longIndx").toString()));
                    dataBean.setShortindx(Double.valueOf(changeMap.get("shortIndx").toString()));
                }
                dataBean.setIndx(Double.valueOf(changeMap.get("indx").toString()));
                dataBean.setInfo(String.valueOf(changeMap.get("info")));
                dataBean.setDate(DateUtil.convertToDate(changeMap.get("date").toString(), DateUtil.YYYY_MM_DD_HH_MM_SS));
                String str = DateConvertUtil.dateToTimestamp(changeMap.get("date").toString());
                if (str == null) {
                    dataBean.setTimestamp(0l);
                } else {
                    dataBean.setTimestamp(Long.valueOf(DateConvertUtil.dateToTimestamp(changeMap.get("date").toString())));
                }
                RedisCache.getInstance().publish(tbl, JsonUtil.objectToJson(dataBean));
                synchronizeDataDao.save(dataBean, tbl);
            }
            if (list.size() > 0) {
                logger.info(tbl + "=====> [ 新增了" + list.size() + "条数据 ]");
            }
        } catch (Exception ex) {
            logger.error(ExceptionUtils.getStackTrace(ex));
            return false;
        }
        return true;
    }


    private List<Map<String, Object>> getWithDateList(DataBean dataBean, String tbl) {
        return synchronizeDataDao.getWithDate(dataBean.getDate(), tbl);
    }

}
