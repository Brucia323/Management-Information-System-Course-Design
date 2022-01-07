package beans;

public class BookType {
    String bookTypeId;
    String bookType;
    
    public BookType(String bookTypeId, String bookType) {
        this.bookTypeId = bookTypeId;
        this.bookType = bookType;
    }
    
    public BookType() {
    }
    
    public String getBookTypeId() {
        return bookTypeId;
    }
    
    public void setBookTypeId(String bookTypeId) {
        this.bookTypeId = bookTypeId;
    }
    
    public String getBookType() {
        return bookType;
    }
    
    public void setBookType(String bookType) {
        this.bookType = bookType;
    }
    
    @Override
    public String toString() {
        return "BookType{" +
                "bookTypeId='" + bookTypeId + '\'' +
                ", bookType='" + bookType + '\'' +
                '}';
    }
}
