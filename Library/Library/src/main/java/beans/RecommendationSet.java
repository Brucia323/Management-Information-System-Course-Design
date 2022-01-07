package beans;

public class RecommendationSet extends Recommendation {
    String bookType;
    
    public RecommendationSet() {
    }
    
    public RecommendationSet(String bookIsbn, String bookName, String bookAuthor, String bookMoney, String bookPress, String bookPublicTime, String bookTypeId, String userId, String bookType) {
        super(bookIsbn, bookName, bookAuthor, bookMoney, bookPress, bookPublicTime, bookTypeId, userId);
        this.bookType = bookType;
    }
    
    public String getBookType() {
        return bookType;
    }
    
    public void setBookType(String bookType) {
        this.bookType = bookType;
    }
    
    @Override
    public String toString() {
        return "RecommendationSet{" +
                "bookIsbn='" + bookIsbn + '\'' +
                ", bookName='" + bookName + '\'' +
                ", bookAuthor='" + bookAuthor + '\'' +
                ", bookMoney='" + bookMoney + '\'' +
                ", bookPress='" + bookPress + '\'' +
                ", bookPublicTime='" + bookPublicTime + '\'' +
                ", bookTypeId='" + bookTypeId + '\'' +
                ", userId='" + userId + '\'' +
                ", bookType='" + bookType + '\'' +
                '}';
    }
}
