package beans;

public class Book {
    String bookId;
    String bookName;
    String bookAuthor;
    String bookIsbn;
    float bookMoney;
    int bookStatus;
    String bookPublictime;
    String bookRackTime;
    String bookTypeId;
    int bookRackId;
    String bookPress;
    
    public Book() {
    }
    
    public Book(String bookId, String bookName, String bookAuthor, String bookIsbn, float bookMoney, int bookStatus, String bookPublictime, String bookRackTime, String bookTypeId, int bookRackId, String bookPress) {
        this.bookId = bookId;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookIsbn = bookIsbn;
        this.bookMoney = bookMoney;
        this.bookStatus = bookStatus;
        this.bookPublictime = bookPublictime;
        this.bookRackTime = bookRackTime;
        this.bookTypeId = bookTypeId;
        this.bookRackId = bookRackId;
        this.bookPress = bookPress;
    }
    
    public String getBookId() {
        return bookId;
    }
    
    public void setBookId(String bookId) {
        this.bookId = bookId;
    }
    
    public String getBookName() {
        return bookName;
    }
    
    public void setBookName(String bookName) {
        this.bookName = bookName;
    }
    
    public String getBookAuthor() {
        return bookAuthor;
    }
    
    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }
    
    public String getBookIsbn() {
        return bookIsbn;
    }
    
    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
    }
    
    public float getBookMoney() {
        return bookMoney;
    }
    
    public void setBookMoney(float bookMoney) {
        this.bookMoney = bookMoney;
    }
    
    public int getBookStatus() {
        return bookStatus;
    }
    
    public void setBookStatus(int bookStatus) {
        this.bookStatus = bookStatus;
    }
    
    public String getBookPublictime() {
        return bookPublictime;
    }
    
    public void setBookPublictime(String bookPublictime) {
        this.bookPublictime = bookPublictime;
    }
    
    public String getBookRackTime() {
        return bookRackTime;
    }
    
    public void setBookRackTime(String bookRackTime) {
        this.bookRackTime = bookRackTime;
    }
    
    public String getBookTypeId() {
        return bookTypeId;
    }
    
    public void setBookTypeId(String bookTypeId) {
        this.bookTypeId = bookTypeId;
    }
    
    public int getBookRackId() {
        return bookRackId;
    }
    
    public void setBookRackId(int bookRackId) {
        this.bookRackId = bookRackId;
    }
    
    public String getBookPress() {
        return bookPress;
    }
    
    public void setBookPress(String bookPress) {
        this.bookPress = bookPress;
    }
    
    @Override
    public String toString() {
        return "Book{" +
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
                '}';
    }
}
