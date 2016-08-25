package com.radarwin.bifu.bm.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by ryan on 16-8-24.
 */
public class DateConvertUtil {
    public static String dateToTimestamp(String user_time) {
        String re_time = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
        Date d;
        if(user_time.equals("1970-01-01 08:00:00.0")){
            return re_time;
        }
        try {
            d = sdf.parse(user_time);
            long l = d.getTime();
            String str = String.valueOf(l);
            if (str.length()<13){
                return re_time;
            }
            re_time = str.substring(0, 13);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return re_time;
    }
}
