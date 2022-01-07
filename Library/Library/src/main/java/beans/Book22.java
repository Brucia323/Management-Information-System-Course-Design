package beans;

public class Book22 extends Book {
    String count;
    String bookType;
    
    public Book22(String bookId, String bookName, String bookAuthor, String bookIsbn, float bookMoney, int bookStatus, String bookPublictime, String bookRackTime, String bookTypeId, int bookRackId, String bookPress, String count, String bookType) {
        super(bookId, bookName, bookAuthor, bookIsbn, bookMoney, bookStatus, bookPublictime, bookRackTime, bookTypeId, bookRackId, bookPress);
        this.count = count;
        this.bookType = bookType;
    }
    
    public Book22() {
    }
    
    @Override
    public String toString() {
        return "Book22{" +
                "bookId='" + bookId + '\'' +
                ", bookName='" + bookName + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookIsbn='" + bookIsbn + '\'' +
                ", bookMoney=" + bookMoney +
                ", bookStatus=" + bookStatus +
                ", bookPublictime='" + bookPublictime + '\'' +
                ", bookRackTime='" + bookRackTime + '\'' +
                ", bookTypeId='" + bookTypeId + '\'' +
                ", bookRackId=" + bookRackId +
                ", bookPress='" + bookPress + '\'' +
                ", count='" + count + '\'' +
                ", bookType='" + bookType + '\'' +
                '}';
    }
    
    public String getCount() {
        return count;
    }
    
    public void setCount(String count) {
        this.count = count;
    }
    
    public String getBookType() {
        return bookType;
    }
    
    public void setBookType(String bookType) {
        this.bookType = bookType;
    }
}
