package com.radarwin.bifu.bm.dao.impl;

import com.radarwin.bifu.bm.bean.DataBean;
import com.radarwin.bifu.bm.dao.SynchronizeDataDao;
import com.radarwin.bifu.bm.util.DateConvertUtil;
import com.radarwin.framework.dao.impl.*;
import com.radarwin.framework.util.DateUtil;
import com.radarwin.framework.util.PropertyReader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCountCallbackHandler;
import org.springframework.stereotype.Repository;

import java.sql.*;
import java.util.*;
import java.util.Date;

/**
 * Created by ryan on 2016/4/21.
 */
@Repository
public class SynchronizeDataDaoImpl implements SynchronizeDataDao {
    @Autowired
    @Qualifier("jdbcTemplate")
    private JdbcTemplate jdbcTemplate;

    @Autowired
    @Qualifier("jdbcTemplate_b")
    private JdbcTemplate jdbcTemplateB;

    private Connection connection;

    private Connection connectionB;

    private String bitreesDatabaseName = PropertyReader.get("jdbc_database_bitrees", "jdbc.properties");

    @Override
    public DataBean getLast(String tbl) {
        StringBuilder sql = new StringBuilder("select * FROM " + tbl + " ORDER BY DATE desc  LIMIT 1 ");
        List<Map<String, Object>> list = jdbcTemplate.queryForList(sql.toString());
        if (list.size() <= 0) {
            return null;
        }
        Map<String, Object> m = list.get(0);
        String prefix = tbl.split("_")[0];
        DataBean dataBean = new DataBean();
        dataBean.setId(Long.valueOf(m.get("id").toString()));
        dataBean.setDate(DateUtil.convertToDate(m.get("date").toString(), DateUtil.YYYY_MM_DD_HH_MM_SS));
        String str =DateConvertUtil.dateToTimestamp(m.get("date").toString());
        if (str == null) {
            dataBean.setTimestamp(0l);
        } else {
            dataBean.setTimestamp(Long.valueOf(DateConvertUtil.dateToTimestamp(m.get("date").toString())));
        }
        dataBean.setIndx(Double.valueOf(m.get("indx").toString()));
        if (prefix.equals("lsi")) {
            dataBean.setLongindx(Double.valueOf(m.get("longindx").toString()));
            dataBean.setShortindx(Double.valueOf(m.get("shortindx").toString()));
            dataBean.setInfo(String.valueOf(m.get("info")));
        }
        if (prefix.equals("bti")) {
            dataBean.setInfo(String.valueOf(m.get("info")));
        }
        return dataBean;
    }

    @Override
    public List<Map<String, Object>> getWithDate(Date date, String tbl) {
        StringBuilder sql = new StringBuilder("SELECT * from " + tbl + " WHERE 1=1 ");
        if (date != null) {
            String d = DateUtil.convertToString(date, DateUtil.YYYY_MM_DD_HH_MM_SS);
            sql.append(" and date = '").append(d).append("'");
        }

        return jdbcTemplateB.queryForList(sql.toString());
    }

    @Override
    public List<Map<String, Object>> getListByDate(Date date, String tbl) {
        StringBuilder sql = new StringBuilder("SELECT * from " + tbl + " WHERE 1=1 ");
        if (date != null) {
            String d = DateUtil.convertToString(date, DateUtil.YYYY_MM_DD_HH_MM_SS);
            sql.append(" and date > '" + d + "'");
        }
        return jdbcTemplateB.queryForList(sql.toString());
    }

    @Override
    public List<Map<String, Object>> getSourceListByName(String tbl) {
        StringBuilder sql = new StringBuilder("SELECT * from " + tbl + " WHERE 1=1 ");
        return jdbcTemplateB.queryForList(sql.toString());
    }

    @Override
    public List<Map<String, Object>> getTargetListByName(String tbl) {
        StringBuilder sql = new StringBuilder("SELECT * from " + tbl + " WHERE 1=1 ");
        return jdbcTemplate.queryForList(sql.toString());
    }

    @Override
    public void createTable(String tbl) throws SQLException {
        StringBuffer sb = new StringBuffer("");
        sb.append("CREATE TABLE `" + tbl + "` (");
        sb.append(" `id` bigint(20) NOT NULL AUTO_INCREMENT,");

        List<Map<String, Object>> list = jdbcTemplateB.queryForList(String.format("select * from information_schema.`COLUMNS` where TABLE_NAME LIKE '%s'", tbl));
        for (Map<String, Object> m : list) {
            String columnName = String.valueOf(m.get("COLUMN_NAME"));
            String columnType = String.valueOf(m.get("COLUMN_TYPE"));
            sb.append(" `" + columnName + "` " + columnType + " , ");
        }
        sb.append(" PRIMARY KEY (`id`),");
        sb.append(" UNIQUE KEY `date` (`date`) USING BTREE ");
        sb.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8;");

        try {
            this.jdbcTemplate.update(sb.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(DataBean dataBean, String tbl) {
        Long id = dataBean.getId();
        Double indx = dataBean.getIndx();
        Double longIndx = dataBean.getLongindx();
        Double shortIndx = dataBean.getShortindx();
        String date = DateUtil.convertToString(dataBean.getDate(), DateUtil.YYYY_MM_DD_HH_MM_SS);
        String info = dataBean.getInfo();
        Long timestamp = dataBean.getTimestamp();

        StringBuilder sql = null;
        String prefix = tbl.split("_")[0];
        if (prefix.equals("bti")) {
            sql = new StringBuilder(
                    "update " + tbl + " set indx=" +
                            indx + ",date='" + date + "' ,info= '" + info + "',timestamp= " + timestamp +
                            " where id =" + id);
        } else if (prefix.equals("lsi")) {
            sql = new StringBuilder(
                    "update " + tbl + " set indx=" +
                            indx + ",date='" + date + "' ,shortIndx= " + shortIndx + " ,longIndx= " + longIndx + " ,info='" + info + "',timestamp= " + timestamp +
                            "  where id =" + id);
        } else if (prefix.equals("newbie")) {
            sql = new StringBuilder(
                    "update " + tbl + " set indx=" +
                            indx + ",date='" + date + "',timestamp= " + timestamp +
                            "  where id =" + id);
        }
        jdbcTemplate.update(sql.toString());
    }

    @Override
    public void save(DataBean dataBean, String tbl) {
        Double indx = dataBean.getIndx();
        Double longIndx = dataBean.getLongindx();
        Double shortIndx = dataBean.getShortindx();
        String date = DateUtil.convertToString(dataBean.getDate(), DateUtil.YYYY_MM_DD_HH_MM_SS);
        String info = dataBean.getInfo();
        Long timestamp = dataBean.getTimestamp();

        StringBuilder sql = null;
        String prefix = tbl.split("_")[0];
        if (prefix.equals("bti")) {
            sql = new StringBuilder(
                    "insert into " + tbl +
                            " (date,indx,info,timestamp) values (' " +
                            date + " ',  " + indx + " ,' " + info + "'," + timestamp + ") ");
        } else if (prefix.equals("lsi")) {
            sql = new StringBuilder(
                    "insert into " + tbl +
                            " (date,indx,info,longIndx,shortIndx,timestamp) values (' " +
                            date + "' ,  " + indx + " ,' " + info + " ',  " + longIndx + ",  " + shortIndx + "," + timestamp + ") ");
        } else if (prefix.equals("newbie")) {
            sql = new StringBuilder(
                    "insert into " + tbl +
                            " (date,indx,timestamp) values (' " +
                            date + " ',  " + indx + "," + timestamp + ") ");
        }
        jdbcTemplate.execute(sql.toString());
    }

    /**
     * 获取指定数据库的所有表名
     *
     * @return tableNames
     */
    public List<String> getAllTableNames() throws SQLException {
        List<String> tableNames = new ArrayList<>();
        ResultSet rest = null;
        try {
            this.connectionB = this.jdbcTemplateB.getDataSource().getConnection();
            DatabaseMetaData dbmd = this.connectionB.getMetaData();
            // 表名列表
            rest = dbmd.getTables(this.bitreesDatabaseName, null, null, new String[]{"TABLE"});
            // 输出 table_name
            while (rest.next()) {
                tableNames.add(rest.getString("TABLE_NAME"));
            }
        } catch (Exception e) {

        } finally {
            this.connectionB.close();
            rest.close();
        }

        return tableNames;
    }

    @Override
    public int checkTable(String tbl) throws SQLException {
        ResultSet rest = null;
        try {
            this.connection = this.jdbcTemplate.getDataSource().getConnection();
            DatabaseMetaData dbmd = this.connection.getMetaData();
            rest = dbmd.getTables(null, null, tbl, null);
            if (rest.next()) {
                return 1;
            }
        } catch (Exception e) {

        } finally {
            this.connection.close();
            rest.close();
        }

        return 0;
    }
}
