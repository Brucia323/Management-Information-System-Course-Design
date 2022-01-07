package beans;

public class BookingInfo {
    String bookingId;
    String bookIsbn;
    String bookName;
    String bookMoney;
    String bookPublictime;
    String bookType;
    String bookPress;
    String bookAuthor;
    String bookingTime;
    String bookingStatus;
    
    public BookingInfo() {
    }
    
    public BookingInfo(String bookingId, String bookIsbn, String bookName, String bookMoney, String bookPublictime, String bookType, String bookPress, String bookAuthor, String bookingTime, String bookingStatus) {
        this.bookingId = bookingId;
        this.bookIsbn = bookIsbn;
        this.bookName = bookName;
        this.bookMoney = bookMoney;
        this.bookPublictime = bookPublictime;
        this.bookType = bookType;
        this.bookPress = bookPress;
        this.bookAuthor = bookAuthor;
        this.bookingTime = bookingTime;
        this.bookingStatus = bookingStatus;
    }
    
    public String getBookingId() {
        return bookingId;
    }
    
    public void setBookingId(String bookingId) {
        this.bookingId = bookingId;
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
    
    public String getBookMoney() {
        return bookMoney;
    }
    
    public void setBookMoney(String bookMoney) {
        this.bookMoney = bookMoney;
    }
    
    public String getBookPublictime() {
        return bookPublictime;
    }
    
    public void setBookPublictime(String bookPublictime) {
        this.bookPublictime = bookPublictime;
    }
    
    public String getBookType() {
        return bookType;
    }
    
    public void setBookType(String bookType) {
        this.bookType = bookType;
    }
    
    public String getBookPress() {
        return bookPress;
    }
    
    public void setBookPress(String bookPress) {
        this.bookPress = bookPress;
    }
    
    public String getBookAuthor() {
        return bookAuthor;
    }
    
    public void setBookAuthor(String bookAuthor) {
        this.bookAuthor = bookAuthor;
    }
    
    public String getBookingTime() {
        return bookingTime;
    }
    
    public void setBookingTime(String bookingTime) {
        this.bookingTime = bookingTime;
    }
    
    public String getBookingStatus() {
        return bookingStatus;
    }
    
    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }
    
    @Override
    public String toString() {
        return "BookingInfo{" +
                "bookingId='" + bookingId + '\'' +
                ", bookIsbn='" + bookIsbn + '\'' +
                ", bookName='" + bookName + '\'' +
                ", bookMoney='" + bookMoney + '\'' +
                ", bookPublictime='" + bookPublictime + '\'' +
                ", bookType='" + bookType + '\'' +
                ", bookPress='" + bookPress + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookingTime='" + bookingTime + '\'' +
                ", bookingStatus='" + bookingStatus + '\'' +
                '}';
    }
}
