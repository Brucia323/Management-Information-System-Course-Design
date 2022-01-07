package beans;

public class Book26 extends Book {
    String oldIsbn;
    
    public String getOldIsbn() {
        return oldIsbn;
    }
    
    public void setOldIsbn(String oldIsbn) {
        this.oldIsbn = oldIsbn;
    }
    
    @Override
    public String toString() {
        return "Book26{" +
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
                ", oldIsbn='" + oldIsbn + '\'' +
                '}';
    }
}
