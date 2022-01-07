package utils;

import beans.Book;
import beans.BookingInfo;
import beans.BorrowInfo;
import beans.Rule;
import com.alibaba.fastjson.JSON;
import dao.UserMapper;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@WebServlet(name = "UserServlet", value = "/UserServlet")
public class UserServlet extends HttpServlet {
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request, response);
    }
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        PrintWriter out = response.getWriter();
        String flag = request.getParameter("flag");
        System.out.println("进入UserServlet 选择方法：" + flag);
        try {
            switch (flag) {
                case "login":
                    out.print(userLogin(request, response));
                    break;
                case "getBookingInfo":
                    out.print(userBookingInfo(request, response));
                    break;
                case "setBooking":
                    out.print(userSetBooking(request, response));
                    break;
                case "cancelReserve":
                    out.print(cancelReserve(request, response));
                    break;
                case "editUserPwd":
                    out.print(editUserPwd(request, response));
                    break;
                case "getRule":
                    out.print(getRule(request, response));
                    break;
                case "returnBook":
                    out.print(returnBook(request, response));
                    break;
                case "getBorrowInfo":
                    out.print(getBorrowInfo(request, response));
                    break;
                case "renew":
                    out.print(renew(request, response));
                    break;
                case "recommendBook":
                    out.print(recommendBook(request, response));
                    break;
                case "getTotalMoney":
                    out.print(getTotalMoney(request, response));
                    break;
                case "setTotalMoney":
                    out.print(setTotalMoney(request, response));
                    break;
                case "compensationBook":
                    out.print(compensationBook(request, response));
                    break;
                case "borrowBook":
                    out.print(borrowBook(request, response));
                    break;
                default:
                    System.out.println("----------------flag error!----------------");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private String borrowBook(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "borrowBook";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //-----------------------------------------------
        String bookId = request.getParameter("bookId");
        String userId = request.getParameter("userId");
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        
        Book result = mapper.interface4_2_1(bookId);
        System.out.println("interface4_2_1Backdata：" + result);
        int number4_2_3 = mapper.getBookingByIsbn(result.getBookIsbn());
        System.out.println("interface4_2_3Backdata:" + number4_2_3);
        int interface4_2_2 = mapper.interface4_2_2(result.getBookIsbn());
        System.out.println("interface4_2_2Backdata:" + interface4_2_2);
        System.out.println("此isbn上架条数为:" + interface4_2_2);
        int booking = mapper.getBookingByIsbn(result.getBookIsbn());
        System.out.println("此isbn预约条数" + booking);
        if (booking >= interface4_2_2) return "-4";
        if (mapper.getNoTicket(userId) != 0) return "-1";
        int borrow = mapper.getBorrowCountByUserId(userId);
        if (Rule.studentMaxCount <= borrow) return "-2";
        if (mapper.getNoReturnBook(userId) > 0) return "-3";
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        System.out.println("图书借出");
        return "1";
    }
    
    
    //缴纳罚金
    private int setTotalMoney(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            int count = userMapper.setAllMoney(userId);
            if (count != 0) {
                session.commit();
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
    
    //获取罚金
    private String getTotalMoney(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            String count = userMapper.getAllMoney(userId);
            if (count != null) {
                return count;
            } else
                return "0";
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //图书荐购
    private int recommendBook(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookIsbn = request.getParameter("bookIsbn");
            String bookName = request.getParameter("bookName");
            String bookAuthor = request.getParameter("bookAuthor");
            String bookMoney = request.getParameter("bookMoney");
            String bookPress = request.getParameter("bookPress");
            String bookPublicTime = request.getParameter("bookPublicTime");
            System.out.println("时间为：" + bookPublicTime);
            String bookTypeId = request.getParameter("bookTypeId");
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            int count = userMapper.getTwoRecommendBook(bookIsbn);
            if (count == 0) {
                System.out.println(count);
                Map<String, String> map = new HashMap<String, String>();
                map.put("bookIsbn", bookIsbn);
                map.put("bookName", bookName);
                map.put("bookAuthor", bookAuthor);
                map.put("bookMoney", bookMoney);
                map.put("bookPress", bookPress);
                map.put("bookPublicTime", bookPublicTime);
                map.put("bookTypeId", bookTypeId);
                map.put("userId", userId);
                int count1 = userMapper.setRecommendBook(map);
                session.commit();
                return 1;
            }
            return -1;
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.close();
        }
    }
    
    //续借
    private String renew(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            String borrowId = request.getParameter("borrowId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            Map<String, String> map = new HashMap<String, String>();
            map.put("userId", userId);
            map.put("borrowId", borrowId);
            map.put("time", String.valueOf(Rule.addTime));
            int count = userMapper.getAddBorrowTime1(map);
            if (count != 0) {
                List<BorrowInfo> borrowInfo = userMapper.getUserBorrowBook(borrowId);
                System.out.println(JSON.toJSONString(borrowInfo));
                session.commit();
                return JSON.toJSONString(borrowInfo);
            }
            return "-1";
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
        
    }
    
    //查看借阅历史 接口6
    private String getBorrowInfo(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            List<BorrowInfo> count = userMapper.getBorrowInfo(userId);
            return JSON.toJSONString(count);
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //还书
    private String returnBook(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            String bookId = request.getParameter("bookId");
            String borrowId = request.getParameter("borrowId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            int count1 = userMapper.editBookStatus(bookId);
            System.out.println("修改图书状态：" + count1);
            if (count1 != 0) {
                Map<String, String> map = new HashMap<String, String>();
                map.put("userId", userId);
                map.put("bookId", bookId);
                float count0 = userMapper.getDay(map);
                System.out.println("天数：" + count0);
                int count2 = userMapper.setReturnBookTime(borrowId);
                if (count2 != 0) {
                    System.out.println("还书时间：" + count2);
                    String bookIsbn = userMapper.getOneBookIsbn(bookId);
                    System.out.println("isbn:" + bookIsbn);
                    Map<String, String> map1 = new HashMap<String, String>();
                    map1.put("userId", userId);
                    map1.put("bookIsbn", bookIsbn);
                    String oneBookingId = userMapper.getFirstBooking(map1);
                    System.out.println(oneBookingId);
                    if (bookIsbn != null && oneBookingId != null) {
                        int count3 = userMapper.setBookingStatus(oneBookingId);
                        System.out.println("通知成功：" + count3);
                    }
                    if (count0 < 0) {
                        Map<String, String> map2 = new HashMap<String, String>();
                        double sum = -Rule.lateRatio * count0;
                        System.out.println("金额：" + sum);
                        map2.put("userId", userId);
                        map2.put("bookId", bookId);
                        map2.put("ticketMoney", String.valueOf(sum));
                        int count4 = userMapper.setUserTicketInfo(map2);
                        System.out.println("插入罚款信息：" + count4);
                    }
                } else {
                    return "-1";
                }
            } else {
                return "-1";
            }
            List<BorrowInfo> borrowInfo = userMapper.getUserBorrowBook(borrowId);
            System.out.println(JSON.toJSONString(borrowInfo));
            session.commit();
            return JSON.toJSONString(borrowInfo);
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //查看借阅规则
    private String getRule(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            int count = userMapper.getBorrowBookCount(userId);
            System.out.println(count);
            Map<String, String> map = new HashMap<>();
            map.put("number", String.valueOf(Rule.studentMaxCount - count));
            map.put("total", String.valueOf(Rule.studentMaxCount));
            map.put("days", String.valueOf(Rule.studentMaxTime));
            map.put("rule1", "(实际还书日期 - 最晚应还日期）* " + Rule.lateRatio);
            return JSON.toJSONString(map);
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //读者修改密码
    private int editUserPwd(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            String newPassword = request.getParameter("newPassword");
            String oldPassword = request.getParameter("oldPassword");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            Map<String, String> map = new HashMap<String, String>();
            map.put("userId", userId);
            map.put("newPassword", newPassword);
            map.put("oldPassword", oldPassword);
            int count = userMapper.editPwd(map);
            if (count != 0) {
                return 1;
            }
            return -1;
        } catch (Exception e) {
            System.out.println(e);
            return -1;
        } finally {
            session.commit();
            session.close();
        }
    }
    
    //取消预约
    private int cancelReserve(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            String bookIsbn = request.getParameter("bookIsbn");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            Map<String, String> map = new HashMap<String, String>();
            map.put("userId", userId);
            map.put("bookIsbn", bookIsbn);
            if (userMapper.delSubscribe(map) > 0)
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
    
    //图书预约
    private int userSetBooking(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String bookIsbn = request.getParameter("bookIsbn");
            String userId = request.getParameter("userId");
            UserMapper userMapper = session.getMapper(UserMapper.class);
            int ticketCount = userMapper.getNoTicket(userId);
            if (ticketCount == 0) {
                int count = userMapper.getNoReturnBook(userId);
                if (count == 0) {
                    //判断有无重复
                    Map<String, String> map = new HashMap<String, String>();
                    map.put("userId", userId);
                    map.put("bookIsbn", bookIsbn);
                    int no = userMapper.getNoBooking(map);
                    if (no == 0) {
                        //插入预约表
                        int yes = userMapper.setBookingInfo(map);
                        session.commit();
                        if (yes != 0) {
                            //查询预约排名
                            int hhh = userMapper.getBookingCount(bookIsbn);
                            //返回hhh,排名
                            System.out.println("当前排名为：" + hhh);
                            return hhh;
                        } else {
                            //返回-3
                            return -3;
                        }
                        //System.out.println("插入预约记录："+yes);
                    } else {
                        //返回-2
                        return -2;
                    }
                    //System.out.println("有无重复预约："+no);
                } else {
                    //返回-1
                    return -1;
                }
            } else {
                return -4;
            }
            //System.out.println("有无未归还图书："+count);
        } catch (Exception e) {
            System.out.println(e);
            return -3;
        } finally {
            session.close();
        }
    }
    
    //查看预约记录
    private String userBookingInfo(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");
            String contentJSON = "-1";
            UserMapper bookMapper = session.getMapper(UserMapper.class);
            List<BookingInfo> books = bookMapper.getBookingInfo(userId);
            if (books != null)
                contentJSON = JSON.toJSONString(books);
            return contentJSON;
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    //读者登录
    private String userLogin(HttpServletRequest request, HttpServletResponse response) {
        SqlSession session = MybatisUtils.getSqlSession();
        try {
            String userId = request.getParameter("userId");//账户
            String userPwd = request.getParameter("userPwd");//密码
            UserMapper userMapper = session.getMapper(UserMapper.class);
            Map<String, String> map = new HashMap<String, String>();
            map.put("userId", userId);
            map.put("userPwd", userPwd);
            String userName = userMapper.userLogin(map);
            if (userName != null) {
                Map<String, String> returnMap = new HashMap<String, String>();
                returnMap.put("userName", userName);
                returnMap.put("result", "1");
                System.out.println(JSON.toJSONString(returnMap));
                return JSON.toJSONString(returnMap);
            }
            return "-1";
        } catch (Exception e) {
            System.out.println(e);
            return "-1";
        } finally {
            session.close();
        }
    }
    
    private String compensationBook(HttpServletRequest request, HttpServletResponse response) {
        Boolean deBug = true;
        String blockName = "compensationBook";
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        if (deBug) System.out.println("方法" + blockName + " IN--------------");
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        String bookIsbn = request.getParameter("bookIsbn");
        String bookName = request.getParameter("bookName");
        String bookMoney = request.getParameter("bookMoney");
        String bookPublictime = request.getParameter("bookPublictime");
        String bookTypeId = request.getParameter("bookTypeId");
        String bookPress = request.getParameter("bookPress");
        String bookAuthor = request.getParameter("bookAuthor");
        
        Map<String, String> map = new HashMap<String, String>();
        map.put("bookIsbn", bookIsbn);
        map.put("bookName", bookName);
        map.put("bookMoney", bookMoney);
        map.put("bookPublictime", bookPublictime);
        map.put("bookTypeId", bookTypeId);
        map.put("bookPress", bookPress);
        map.put("bookAuthor", bookAuthor);
//        map.put("oldIsbn", oldIsbn);
        System.out.println("传入数据：" + map);
        //-----------------------------------------------
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        int result = mapper.compensationBook(map);
        if (deBug) System.out.println("返回数据：" + JSON.toJSON(result));
        if (deBug) System.out.println("方法" + blockName + " END--------------");
        if (result >= 0) {
            return "1";
        } else {
            return "-1";
        }
    }
    
    
}
