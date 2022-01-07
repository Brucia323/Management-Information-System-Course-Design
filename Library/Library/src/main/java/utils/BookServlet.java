package utils;

import beans.Book22;
import beans.BookDetail;
import beans.BookType;
import com.alibaba.fastjson.JSON;
import dao.BookMapper;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "BookServlet", value = "/BookServlet")
public class BookServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.setCharacterEncoding("utf-8");
            response.setContentType("text/html; charset=utf-8");
            PrintWriter out = response.getWriter();
            String flag = request.getParameter("flag");
            System.out.println("进入BookServlet 选择方法：" + flag);
            switch (flag) {
                case "getTotalBook":
                    out.print(getTotalBook(request, response));
                    break;
                case "getOneBook":
                    out.print(getOneBook(request, response));
                    break;
                case "bookUp":
                    out.print(bookUp(request, response));
                    break;
                case "bookDown":
                    out.print(bookDown(request, response));
                    break;
                case "getBookType":
                    out.print(getBookType(request, response));
                    break;
                case "bookEdit":
                    out.print(bookEdit(request, response));
                    break;
                case "upOneBook":
                    out.print(upOneBook(request, response));
                    break;
                case "downOneBook":
                    out.print(downOneBook(request, response));
                    break;
                case "lost":
                    out.print(lost(request, response));
                    break;
                case "getAllBook":
                    out.print(getAllBook(request, response));
                    break;
                default:
                    System.out.println("----------------flag error!----------------");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    //图书批量下架
    private int bookDown(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookDownIsbn = request.getParameter("bookDownIsbn").replaceAll("\"", "");
            String[] bookIsbn = ParameterTool.toStringArry(bookDownIsbn);
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            return bookMapper.setBookDown(bookIsbn);
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    //图书批量上架
    private int bookUp(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookUpIsbn = request.getParameter("bookUpIsbn").replaceAll("\"", "");
            String[] bookIsbn = ParameterTool.toStringArry(bookUpIsbn);
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            return bookMapper.setBookUp(bookIsbn);
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    //按isbn显示详细图书信息
    private String getOneBook(HttpServletRequest request, HttpServletResponse response) {
        String bookIsbn = request.getParameter("isbn");
        String contentJSON = "-1";
        SqlSession session = MybatisUtils.getSqlSession();
        BookMapper bookMapper = session.getMapper(BookMapper.class);
        List<BookDetail> books = bookMapper.getBookByIsbn(bookIsbn);
        if (books != null)
            contentJSON = JSON.toJSONString(books);
        return contentJSON;
    }
    
    //读取所有图书信息，按isbn合并
    private String getTotalBook(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "getTotalBook";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        SqlSession sqlSession = MybatisUtils.getSqlSession();
//-----------------------------------------------
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        
        List<Book22> result = mapper.selectTotalByIsbn();
        
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        if (!result.isEmpty()) {
            return JSON.toJSONString(result);
        } else {
            return "-1";
        }
    }
    
    //获取图书类别
    private String getBookType(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "getBookType";
        String setSessionName = "";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        HttpSession session = request.getSession();
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        String Json;
//-----------------------------------------------
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        List<BookType> result = mapper.getBookType();
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
//        sqlSession.commit();
//        sqlSession.close();
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        
        if (!result.isEmpty()) {
//            out.print(JSON.toJSON(result));
            return JSON.toJSONString(result);
        } else {
//            out.print(-1);
            return "-1";
        }
    }
    
    //interface2.6
    private String bookEdit(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "bookEdit";
        String setSessionName = "";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        HttpSession session = request.getSession();
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        String Json;
//-----------------------------------------------
        String bookIsbn = request.getParameter("bookIsbn");
        String bookName = request.getParameter("bookName");
        String bookMoney = request.getParameter("bookMoney");
        String bookPublictime = request.getParameter("bookPublictime");
        String bookTypeId = request.getParameter("bookTypeId");
        String bookPress = request.getParameter("bookPress");
        String bookAuthor = request.getParameter("bookAuthor");
        String oldIsbn = request.getParameter("oldIsbn");
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        Map<String, String> map = new HashMap<String, String>();
        map.put("bookIsbn", bookIsbn);
        map.put("bookName", bookName);
        map.put("bookMoney", bookMoney);
        map.put("bookPublictime", bookPublictime);
        map.put("bookTypeId", bookTypeId);
        map.put("bookPress", bookPress);
        map.put("bookAuthor", bookAuthor);
        map.put("oldIsbn", oldIsbn);
        System.out.println("传入数据：" + map);
        int result = mapper.bookEdit(map);
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        if (result >= 0) {//succeed
            sqlSession.commit();
//            sqlSession.close();
            List<Book22> list = mapper.selectTotalByIsbn();
//            System.out.println("输出数据：" + JSON.toJSON(list));
            for (int i = 0; i < list.size(); i++) {
                Book22 book = list.get(i);
                if (book.getBookIsbn().equals(bookIsbn)) {
                    System.out.println("返回数据:" + JSON.toJSONString(book));
                    sqlSession.close();
                    return JSON.toJSONString(book);
                }
            }
            return "-1";
        } else {
            sqlSession.close();
            return "-1";
        }
    }
    
    //单本上架
    private int upOneBook(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookUp = request.getParameter("bookId");
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            return bookMapper.upOneBook(bookUp);
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    //单本下架
    private int downOneBook(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookDown = request.getParameter("bookId");
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            return bookMapper.downOneBook(bookDown);
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    private int lost(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "lost";
        String setSessionName = "";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        HttpSession session = request.getSession();
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        String Json;
//-----------------------------------------------
        String bookId = request.getParameter("bookId");
        BookMapper mapper = sqlSession.getMapper(BookMapper.class);
        System.out.println("bookId：" + bookId);
        int result = mapper.lost(bookId);
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        if (result >= 0) {
            sqlSession.commit();
            sqlSession.close();
            return 1;
        } else {
            sqlSession.close();
            return -1;
        }
    }
    
    //显示所有图书，按ISBN合并（只显示上架和借阅的）
    private String getAllBook(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String contentJSON = "-1";
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            List<Book22> books = bookMapper.selectAllBook();
            System.out.println(JSON.toJSONString(books));
            if (books != null) {
                contentJSON = JSON.toJSONString(books);
            }
            return contentJSON;
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
}
