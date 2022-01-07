package dao;

import beans.Book22;
import beans.BookDetail;
import beans.BookType;

import java.util.List;
import java.util.Map;

public interface BookMapper {
    //根据isbn查图书信息
    List<BookDetail> getBookByIsbn(String bookIsbn);
    
    //根据图书isbn下架图书
    int setBookUp(String[] book);
    
    //下架
    int setBookDown(String[] book);
    
    //获取图书类别
    List<BookType> getBookType();
    
    //interface 2.1
    List<Book22> selectTotalByIsbn();
    
    //interface2.6
    int bookEdit(Map<String, String> bookEdit);
    
    //单本上架
    int upOneBook(String bookId);
    
    //单本下架
    int downOneBook(String bookId);
    
    //    interface210
    int lost(String bookId);
    
    //
    List<Book22> selectAllBook();
}
