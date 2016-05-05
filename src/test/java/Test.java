import com.radarwin.bifu.bm.bean.DataBean;
import com.radarwin.bifu.bm.service.SynchronizeDataService;
import org.springframework.beans.factory.annotation.Autowired;


import java.util.List;

/**
 * Created by test on 2015/12/23.
 */
public class Test extends BaseTest {

    @Autowired
    private SynchronizeDataService synchronizeDataService;

    @org.junit.Test
    public void addNewData() {
        long startTime = System.currentTimeMillis();
        System.out.println("开始同步数据====》" + startTime);

        List<String> list = synchronizeDataService.handleTableList();
        for (String tbl : list) {
            DataBean d = synchronizeDataService.getLast(tbl);
            if (d == null) {
                synchronizeDataService.initTable(tbl);
            } else {
                synchronizeDataService.addNewData(d, tbl);
            }
        }
        long endTime = System.currentTimeMillis();
        System.out.println("同步数据结束====》" + endTime);
        System.out.println("消耗时间========》" + (endTime - startTime) + "毫秒");
    }

    @org.junit.Test
    public void getLast() {
        Object o = synchronizeDataService.getLast("bti_15");
        System.out.println(o);
    }

    @org.junit.Test
    public void tete(){
        try {
            Thread.sleep(Integer.MAX_VALUE);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}


