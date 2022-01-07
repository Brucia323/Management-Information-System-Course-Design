package dao;

import beans.Book;
import beans.BookingInfo;
import beans.BorrowInfo;

import java.util.List;
import java.util.Map;

public interface UserMapper {
    String userLogin(Map<String, String> userLogin);
    
    //查询有无未归还图书
    int getNoReturnBook(String userId);
    
    //查询有无未缴罚款
    int getNoTicket(String userId);
    
    //查询借书数量
    int getBorrowCountByUserId(String userId);
    
    //用isbn查询该类书预约人数
    int getBookingByIsbn(String bookIsbn);
    
    //判断有无重复预约
    int getNoBooking(Map<String, String> map);
    
    //插入预约记录
    int setBookingInfo(Map<String, String> map);
    
    //查看预约排名
    int getBookingCount(String bookIsbn);
    
    //查看预约记录
    List<BookingInfo> getBookingInfo(String userId);
    
    //取消预约
    int delSubscribe(Map<String, String> map);
    
    //修改密码
    int editPwd(Map<String, String> map);
    
    //查看可借数量
    int getBorrowBookCount(String userId);
    
    //修改图书状态
    int editBookStatus(String bookId);
    
    //查是否超期，返回天数
    float getDay(Map<String, String> map);
    
    //添加还书时间
    int setReturnBookTime(String borrowId);
    
    //查找书的isbn
    String getOneBookIsbn(String bookId);
    
    //查找可借阅第一人的预约记录id
    String getFirstBooking(Map<String, String> map);
    
    //通知可借阅第一人
    int setBookingStatus(String bookingId);
    
    //添加罚金记录
    int setUserTicketInfo(Map<String, String> map);
    
    
    //11
    int compensationBook(Map<String, String> map);
    
    
    //查看借阅历史 getBorrowInfo
    List<BorrowInfo> getBorrowInfo(String userId);
    
    //续借
    int getAddBorrowTime1(Map<String, String> map);
    
    //查找用户当前所借确定图书的借阅信息
    List<BorrowInfo> getUserBorrowBook(String borrowId);
    
    //读取荐购表是否有重复
    int getTwoRecommendBook(String bookIsbn);
    
    //图书荐购
    int setRecommendBook(Map<String, String> map);
    
    //获取罚金
    String getAllMoney(String userId);
    
    //罚金缴纳
    int setAllMoney(String userId);
    
    
    Book interface4_2_1(String bookId);
    
    int interface4_2_2(String bookIsbn);
    
    
}
