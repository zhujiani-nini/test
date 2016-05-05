import com.radarwin.generate.AutoGenerate;

/**
 * Created by ryan on 15/12/21.
 */
public class Generate {
    public static void main(String[] args) {
        AutoGenerate autoGenerate = new AutoGenerate("127.0.0.1", "3306", "qwer", "root", "3e6y8i");
        autoGenerate.setBasePackage("com.radarwin.bifu.bm");
        autoGenerate.generateCode("");
    }
}
