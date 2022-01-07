import beans.*;
import com.alibaba.fastjson.JSON;
import dao.AdminMapper;
import dao.BasicMapper;
import dao.BookMapper;
import org.apache.ibatis.session.SqlSession;
import utils.MybatisUtils;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class XueTest {
    static SqlSession sqlSession = MybatisUtils.getSqlSession();
    
    public static void login() {
        AdminMapper mapper = sqlSession.getMapper(AdminMapper.class);
        try {
            Map<String, String> login = new HashMap<String, String>();
            login.put("adminId", "1");
            login.put("adminPwd", "123");
            System.out.println("输入数据:" + login);
            List<Admin> userList = mapper.login(login);
            System.out.println("输出数据:" + JSON.toJSON(userList));
//            userList.forEach(stu -> System.out.println(stu));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    protected static void getTotalBook() {
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        try {
            List<Book22> list = mapper.selectTotalByIsbn();
            System.out.println("输出数据：" + JSON.toJSON(list));
            for (int i = 0; i < list.size(); i++) {
                Book book = list.get(i);
                if (book.getBookIsbn().equals("isbn3")) {
                    System.out.println(book);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
//            sqlSession.commit();
            sqlSession.close();
        }
    }
    
    protected static void getBookType() {
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        try {
            List<BookType> list = mapper.getBookType();
            System.out.println("输出数据：" + JSON.toJSON(list));
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
//            sqlSession.commit();
//            sqlSession.close();
        }
    }
    
    public static void bookEdit() {
        Boolean deBug = true;
        String blockName = "bookEdit";
        String setSessionName = "";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        String Json;
        int result = -1;
//-----------------------------------------------
        String bookIsbn = "isbn3";
        String bookName = "书33";
        String bookMoneyTemp = "33";
        float bookMoney = Float.valueOf(bookMoneyTemp).floatValue();
        String bookPublictime = "2022-01-03 14:51:54";
        String bookTypeId = "1";
        String bookPress = "出版商3";
        String bookAuthor = "作者33";
        String oldIsbn = "isbn1";
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        
        Map<String, String> map = new HashMap<String, String>();
        map.put("bookIsbn", bookIsbn);
        map.put("bookName", bookName);
        map.put("bookMoney", bookMoneyTemp);
        map.put("bookPublictime", bookPublictime);
        map.put("bookTypeId", bookTypeId);
        map.put("bookPress", bookPress);
        map.put("bookAuthor", bookAuthor);
        map.put("oldIsbn", oldIsbn);
        System.out.println("map=" + map);
        result = mapper.bookEdit(map);

//        Book26 book=new Book26();
//        book.setBookIsbn(bookIsbn);
//        book.setBookName(bookName);
//        book.setBookMoney(bookMoney);
//        book.setBookPublictime(bookPublictime);
//        book.setBookTypeId(bookTypeId);
//        book.setBookPress(bookPress);
//        book.setBookAuthor(bookAuthor);
//        book.setOldIsbn(oldIsbn);
//        System.out.println("book26:"+book.toString());
//        result= mapper.bookEdit(book);
        
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
//        sqlSession.commit();
        sqlSession.close();
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        
        if (result >= 0) {
//            out.print(JSON.toJSON(result));
//            sqlSession.commit();
            sqlSession.close();
            System.out.println("succeed");
        } else {
            System.out.println("error");
        }
    }
    
    public static void getTotalCollege31() {
        BasicMapper mapper = sqlSession.getMapper(BasicMapper.class);
        try {
            List<College> list = mapper.getTotalCollege();
            System.out.println("输出数据:" + JSON.toJSON(list));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void getTotalCollege32() {
        BasicMapper mapper = sqlSession.getMapper(BasicMapper.class);
        try {
            List<Major> list = mapper.getTotalMajor();
            System.out.println("输出数据:" + JSON.toJSON(list));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    public static void main(String[] args) throws IOException {
//        login();
//        getTotalBook();
//       String []a= ParameterTool.toStringArry("[test1,test2,test3]");
//        for (int i = 0; i < a.length; i++) {
//            System.out.println(a[i]);
//        }
//        getBookType();
//        bookEdit();
//        getTotalCollege32();
//        sqlSession.close();
//        ParameterTool.ReadExcelXlsx("C://Users//10161//Desktop//fileTest//src//main//resources//chart.xlsx");
    }
}
