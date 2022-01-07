package utils;

import beans.*;
import com.alibaba.fastjson.JSON;
import dao.AdminMapper;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet("/AdminServlet")
public class AdminServlet extends HttpServlet {
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
            System.out.println("进入FileServlet 选择方法：" + flag);
            
            switch (flag) {
                case "login":
                    out.print(login(request, response));
                    break;
                case "resetPassword":
                    out.print(resetPassword(request, response));
                    break;
                case "getRecommendInfo":
                    out.print(getRecommendInfo(request, response));
                    break;
                case "getRule":
                    out.print(getRule(request, response));
                    break;
                case "setRule":
                    out.print(setRule(request, response));
                    break;
                case "adminAudit":
                    out.print(adminAudit(request, response));
                    break;
                case "showDataAnalyze":
                    out.print(showDataAnalyze(response, request));
                    break;
                default:
                    System.out.println("----------------flag error!----------------");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        
    }
    
    //荐购审核
    private int adminAudit(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            AdminMapper adminMapper = session.getMapper(AdminMapper.class);
            String result = request.getParameter("result");
            String bookIsbn = request.getParameter("bookIsbn");
            System.out.println("是否通过：" + result);
            if (result.equals("1")) {
                System.out.println("通过");
                //插入
                List<Recommendation> list = adminMapper.getRecommendationByIsbn(bookIsbn);
                System.out.println("查表所得:" + list);
                Map<String, String> map = new HashMap<String, String>();
                map.put("bookAuthor", list.get(0).getBookAuthor());
                map.put("bookIsbn", list.get(0).getBookIsbn());
                map.put("bookMoney", list.get(0).getBookMoney());
                map.put("bookName", list.get(0).getBookName());
                map.put("bookPress", list.get(0).getBookPress());
                map.put("bookPublictime", list.get(0).getBookPublicTime());
                map.put("bookId", list.get(0).getBookTypeId() + list.get(0).getBookIsbn() + (int) (1 + Math.random() * (10 - 1 + 1)));
                map.put("bookTypeId", list.get(0).getBookTypeId());
                map.put("bookRackId", list.get(0).getBookTypeId());
                int count = adminMapper.setBookByInfo(map);
                session.commit();
                if (count == 0)
                    return -1;
            }
            //删除
            int count = adminMapper.delOneRecommendationInfo(bookIsbn);
            session.commit();
            if (count != 0) {
                return 1;
            } else {
                return -1;
            }
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.close();
        }
    }
    
    //修改规则
    private int setRule(HttpServletRequest request, HttpServletResponse response) {
        try {
            String teacherMaxCount = request.getParameter("teacherMaxCount");
            String studentMaxCount = request.getParameter("studentMaxCount");
            String teacherMaxTime = request.getParameter("teacherMaxTime");
            String studentMaxTime = request.getParameter("studentMaxTime");
            String lateRatio = request.getParameter("lateRatio");
            String addTime = request.getParameter("addTime");
            
            Rule.lateRatio = Double.parseDouble(lateRatio);
            Rule.studentMaxCount = Integer.parseInt(studentMaxCount);
            Rule.studentMaxTime = Integer.parseInt(studentMaxTime);
            Rule.teacherMaxCount = Integer.parseInt(teacherMaxCount);
            Rule.teacherMaxTime = Integer.parseInt(teacherMaxTime);
            Rule.addTime = Integer.parseInt(addTime);
            return 1;
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        }
    }
    
    //获取规则
    private String getRule(HttpServletRequest request, HttpServletResponse response) {
        try {
            Map<String, String> map = new HashMap<String, String>();
            map.put("teacherMaxCount", String.valueOf(Rule.teacherMaxCount));
            map.put("studentMaxCount", String.valueOf(Rule.studentMaxCount));
            map.put("teacherMaxTime", String.valueOf(Rule.teacherMaxTime));
            map.put("studentMaxTime", String.valueOf(Rule.studentMaxTime));
            map.put("lateRatio", String.valueOf(Rule.lateRatio));
            map.put("addTime", String.valueOf(Rule.addTime));
            return JSON.toJSONString(map);
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        }
    }
    
    //获取推荐信息
    private String getRecommendInfo(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            AdminMapper adminMapper = session.getMapper(AdminMapper.class);
            List<RecommendationSet> recommendationList = adminMapper.recommendationInfo();
            return JSON.toJSONString(recommendationList);
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //重置密码
    private int resetPassword(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        String userId = request.getParameter("userId");
        try {
            AdminMapper adminMapper = session.getMapper(AdminMapper.class);
            if (adminMapper.resetPassword(userId) > 0)
                return 1;
            return -1;
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    protected String login(HttpServletRequest request, HttpServletResponse response) {
        
        Boolean deBug = false;
        String blockName = "login";
        String setSessionName = "admin";//存入管理员类
        String adminId = request.getParameter("adminId");//账户
        String adminPwd = request.getParameter("adminPwd");//密码
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        HttpSession session = request.getSession();
        SqlSession sqlSession = MybatisUtils.getSqlSession();
//-----------------------------------------------
        
        AdminMapper mapper = sqlSession.getMapper(AdminMapper.class);
        
        
        if (deBug) System.out.println("输入数据:admin_id=" + adminId + " admin_pwd=" + adminPwd);
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        Map<String, String> login = new HashMap<String, String>();
        login.put("adminId", adminId);
        login.put("adminPwd", adminPwd);
        List<Admin> result = mapper.login(login);
        Map<String, String> backData = new HashMap<String, String>();
        try {
            Admin admin = result.get(0);
            backData.put("adminName", admin.getAdminName());
            if (deBug) System.out.println("返回数据：" + JSON.toJSON(backData));
            sqlSession.commit();
            sqlSession.close();
            if (deBug) System.out.println("方法" + blockName + " END--------------");
            if (!result.isEmpty()) {
                backData.put("result", "1");
//                out.print(JSON.toJSON(backData));
                session.setAttribute(setSessionName, admin);
                return JSON.toJSON(backData).toString();
            } else return "0";
        } catch (Exception e) {
            e.printStackTrace();
//            out.print(-1);
            return "-1";
        }
    }
    
    private String showDataAnalyze(HttpServletResponse response, HttpServletRequest request) {
        SqlSession session = MybatisUtils.getSqlSession();
        AdminMapper mapper = session.getMapper(AdminMapper.class);
        int count = mapper.getBorrowCount();
        BookMapper mapper1 = session.getMapper(BookMapper.class);
        List<BookType> bookTypes = mapper1.getBookType();
        List<Map> list = new ArrayList<>();
        for (BookType bookType : bookTypes) {
            Map<String, String> map = new HashMap<>();
            map.put("type", bookType.getBookType());
            map.put("value", mapper.getBookCount(Integer.parseInt(bookType.getBookTypeId())));
            list.add(map);
        }
        session.close();
        Map<String, Object> map1 = new HashMap<>();
        map1.put("count", count);
        map1.put("list", list);
//        Gson gson = new Gson();
        return JSON.toJSONString(map1);
    }
    
    
}
