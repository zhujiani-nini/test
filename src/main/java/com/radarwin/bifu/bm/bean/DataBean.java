package com.radarwin.bifu.bm.bean;

import com.radarwin.bifu.bm.util.DateConvertUtil;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by ryan on 2016/4/22.
 */
public class DataBean {
    private Long id;
    private Date date;
    private Double indx;
    private String info;
    private Double longindx;
    private Double shortindx;
    private Long timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }


    public Double getIndx() {
        return indx;
    }

    public void setIndx(Double indx) {
        this.indx = indx;
    }


    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Double getLongindx() {
        return longindx;
    }

    public void setLongindx(Double longindx) {
        this.longindx = longindx;
    }

    public Double getShortindx() {
        return shortindx;
    }

    public void setShortindx(Double shortindx) {
        this.shortindx = shortindx;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public static void main(String[] args) {
//        DateConvertUtil.dateToTimestamp("2016-08-24 16:38:00.0");
        DateConvertUtil.dateToTimestamp("1970-01-01 08:00:00.0");

    }
}
