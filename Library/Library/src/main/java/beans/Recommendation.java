package beans;

public class Recommendation {
    String bookIsbn;
    String bookName;
    String bookAuthor;
    String bookMoney;
    String bookPress;
    String bookPublicTime;
    String bookTypeId;
    String userId;
    
    public Recommendation() {
    }
    
    public Recommendation(String bookIsbn, String bookName, String bookAuthor, String bookMoney, String bookPress, String bookPublicTime, String bookTypeId, String userId) {
        this.bookIsbn = bookIsbn;
        this.bookName = bookName;
        this.bookAuthor = bookAuthor;
        this.bookMoney = bookMoney;
        this.bookPress = bookPress;
        this.bookPublicTime = bookPublicTime;
        this.bookTypeId = bookTypeId;
        this.userId = userId;
    }
    
    public String getBookIsbn() {
        return bookIsbn;
    }
    
    public void setBookIsbn(String bookIsbn) {
        this.bookIsbn = bookIsbn;
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
    
    public String getBookMoney() {
        return bookMoney;
    }
    
    public void setBookMoney(String bookMoney) {
        this.bookMoney = bookMoney;
    }
    
    public String getBookPress() {
        return bookPress;
    }
    
    public void setBookPress(String bookPress) {
        this.bookPress = bookPress;
    }
    
    public String getBookPublicTime() {
        return bookPublicTime;
    }
    
    public void setBookPublicTime(String bookPulicTime) {
        this.bookPublicTime = bookPulicTime;
    }
    
    public String getBookTypeId() {
        return bookTypeId;
    }
    
    public void setBookTypeId(String bookTypeId) {
        this.bookTypeId = bookTypeId;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    @Override
    public String toString() {
        return "Recommendation{" +
                "bookIsbn='" + bookIsbn + '\'' +
                ", bookName='" + bookName + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookMoney='" + bookMoney + '\'' +
                ", bookPress='" + bookPress + '\'' +
                ", bookPublicTime='" + bookPublicTime + '\'' +
                ", bookTypeId='" + bookTypeId + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}
