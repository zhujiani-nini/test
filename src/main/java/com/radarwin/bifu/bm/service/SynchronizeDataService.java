package com.radarwin.bifu.bm.service;

import com.radarwin.bifu.bm.bean.DataBean;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

/**
 * Created by ryan on 2016/4/19.
 */
public interface SynchronizeDataService {
    List<String> handleTableList();

    DataBean getLast(String tbl);

    boolean initTable(String tbl);

    boolean addNewData(DataBean dataBean,String tbl);
}
