package com.radarwin.bifu.bm.bean;

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

    public static void main(String[] args) {

    }
}
