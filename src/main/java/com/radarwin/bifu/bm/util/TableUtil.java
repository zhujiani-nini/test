package com.radarwin.bifu.bm.util;

import org.springframework.jdbc.core.JdbcTemplate;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.sql.Types;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * Created by ryan on 2016/4/22.
 */
public class TableUtil {

    /**
     * 根据传入的数据库表名
     * 转换为实体类
     * 移除空格，将每个单词的首字母设置为大写
     *
     * @param tbl
     * @return
     */
    public static String convertTableToModelName(String tbl) {
        StringBuffer tmp = new StringBuffer();
        char[] ch = tbl.toCharArray();
        for (int i = 0; i < ch.length; i++) {
            char c = ch[i];
            if (i == 0) {
                tmp.append(String.valueOf(c).toUpperCase());
            } else if (i > 0 && Integer.valueOf(ch[i - 1]) == 95) {
                tmp.append(String.valueOf(c).toUpperCase());
            } else {
                tmp.append(String.valueOf(c));
            }
        }
        return tmp.toString().replaceAll("_", "");
    }

    public static int createTable(JdbcTemplate jt, String tableName, Object obj) {
        StringBuffer sb = new StringBuffer("");
        sb.append("CREATE TABLE `" + tableName + "` (");
        sb.append(" `id` int(11) NOT NULL AUTO_INCREMENT,");
        Map<String, String> map = getProperty(obj);
        Set<String> set = map.keySet();
        for (String key : set) {
            sb.append("`" + key + "` varchar(255) DEFAULT '',");
        }
        sb.append(" `tableName` varchar(255) DEFAULT '',");
        sb.append(" PRIMARY KEY (`id`)");
        sb.append(") ENGINE=InnoDB DEFAULT CHARSET=utf8;");
        try {
            jt.update(sb.toString());
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

    public static Map<String, String> getProperty(Object entityName) {
        Map<String, String> map = new HashMap<String, String>();
        try {
            Class c = entityName.getClass();
            // 获得对象属性
            Field field[] = c.getDeclaredFields();
            for (Field f : field) {
                Object v = invokeMethod(entityName, f.getName(), null);
                map.put(f.getName(), v.toString());
            }
        } catch (Exception e) {
            map = null;
        }
        return map;
    }

    private static Object invokeMethod(Object owner, String methodName,
                                       Object[] args) throws Exception {
        Class ownerClass = owner.getClass();
        methodName = methodName.substring(0, 1).toUpperCase()
                + methodName.substring(1);
        Method method = null;
        try {
            method = ownerClass.getMethod("get" + methodName);
        } catch (SecurityException e) {
        } catch (NoSuchMethodException e) {
            return " can't find 'get" + methodName + "' method";
        }
        return method.invoke(owner);
    }

    public static String getDataType(int type) {
        String dataType = "";

        switch (type) {
            case Types.VARCHAR:  //12
                dataType = "varchar";
                break;
            case Types.INTEGER:  //4
                dataType = "int";
                break;
            case Types.TIMESTAMP: //93
                dataType = "datetime";
                break;
            case Types.FLOAT:    //6
                dataType = "float";
                break;
            default:
                dataType = "String";
        }
        return dataType;
    }
}
