import com.radarwin.bifu.bm.bean.DataBean;
import com.radarwin.bifu.bm.service.SynchronizeDataService;
import com.radarwin.framework.cache.RedisCache;
import org.springframework.beans.factory.annotation.Autowired;
import redis.clients.jedis.JedisPubSub;


import java.sql.SQLException;
import java.util.List;
import java.util.Map;

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
        RedisCache.getInstance().publish("test536325353256","rrrrrr");
    }

    @org.junit.Test
    public void tete() {
//        RedisCache.getInstance().publish("test536325353256","11113311");
        RedisCache.getInstance().subscribe(new JedisPubSub() {
            @Override
            public void onMessage(String channel, String message) {
                super.onMessage(channel, message);
                System.out.println(message);
            }

            @Override
            public void onSubscribe(String channel, int subscribedChannels) {
                super.onSubscribe(channel, subscribedChannels);
                System.out.println(channel);
            }
        },"bti_1");
    }
}


