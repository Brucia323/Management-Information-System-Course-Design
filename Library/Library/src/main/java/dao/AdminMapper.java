package dao;

import beans.Admin;
import beans.Recommendation;
import beans.RecommendationSet;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

public interface AdminMapper {
    List<Admin> login(Map<String, String> login);
    
    //    List<Book22> selectTotalByIsbn();
    int resetPassword(String userPwd);
    
    //荐购信息读取
    List<RecommendationSet> recommendationInfo();
    
    //   荐购审核1.1通过ISBN在推荐表查这本书的信息
    List<Recommendation> getRecommendationByIsbn(String bookIsbn);
    
    //    荐购审核1.2将推荐的书插入到book表中
    int setBookByInfo(Map<String, String> map);
    
    //    荐购审核1.3将审核不通过的删除
    int delOneRecommendationInfo(String bookIsbn);
    
    @Select("select count(*) as borrowCount from borrow")
    int getBorrowCount();
    
    @Select("select count(*) as count from book where book_type_id = #{id}")
    String getBookCount(@Param("id") int id);
}
