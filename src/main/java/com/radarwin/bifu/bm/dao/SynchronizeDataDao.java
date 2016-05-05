package com.radarwin.bifu.bm.dao;

import com.radarwin.bifu.bm.bean.DataBean;

import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by ryan on 2016/4/21.
 */
public interface SynchronizeDataDao {
    DataBean getLast(String tbl);

    List<Map<String, Object>> getWithDate(Date date,String tbl);

    List<Map<String, Object>> getListByDate(Date date,String tbl);

    List<Map<String, Object>> getSourceListByName(String tbl);

    List<Map<String, Object>> getTargetListByName(String tbl);

    void createTable (String tbl) throws SQLException;

    void update(DataBean dataBean,String tbl);

    void save(DataBean dataBean,String tbl);

    List getAllTableNames() throws SQLException;

    int checkTable(String tbl) throws SQLException;

}
