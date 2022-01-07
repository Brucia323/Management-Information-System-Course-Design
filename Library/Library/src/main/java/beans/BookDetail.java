package beans;

public class BookDetail extends Book {
    private String bookType;
    private String bookRackPosition;
    private String bookRackType;
    
    public BookDetail() {
    }
    
    public BookDetail(String bookId, String bookName, String bookAuthor, String bookIsbn, float bookMoney, int bookStatus, String bookPublictime, String bookRackTime, String bookTypeId, int bookRackId, String bookPress, String bookType, String bookRackPosition, String bookRackType) {
        super(bookId, bookName, bookAuthor, bookIsbn, bookMoney, bookStatus, bookPublictime, bookRackTime, bookTypeId, bookRackId, bookPress);
        this.bookType = bookType;
        this.bookRackPosition = bookRackPosition;
        this.bookRackType = bookRackType;
    }
    
    public String getBookType() {
        return bookType;
    }
    
    public void setBookType(String bookType) {
        this.bookType = bookType;
    }
    
    public String getBookRackPosition() {
        return bookRackPosition;
    }
    
    public void setBookRackPosition(String bookRackPosition) {
        this.bookRackPosition = bookRackPosition;
    }
    
    public String getBookRackType() {
        return bookRackType;
    }
    
    public void setBookRackType(String bookRackType) {
        this.bookRackType = bookRackType;
    }
    
    @Override
    public String toString() {
        return "BookDetail{" +
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
                ", bookType='" + bookType + '\'' +
                ", bookRackPosition='" + bookRackPosition + '\'' +
                ", bookRackType='" + bookRackType + '\'' +
                '}';
    }
}
