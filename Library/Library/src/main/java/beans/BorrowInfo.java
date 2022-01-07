package beans;

public class BorrowInfo {
    //borrow_id,borrow.book_id,book_name,borrow_reborrow_time,borrow_borrow_time,borrow_return_time
    String borrowId;
    String bookId;
    String bookName;
    String borrowReborrowTime;
    String borrowBorrowTime;
    String borrowReturnTime;
    
    public BorrowInfo() {
    }
    
    public BorrowInfo(String borrowId, String bookId, String bookName, String borrowReborrowTime, String borrowBorrowTime, String borrowReturnTime) {
        this.borrowId = borrowId;
        this.bookId = bookId;
        this.bookName = bookName;
        this.borrowReborrowTime = borrowReborrowTime;
        this.borrowBorrowTime = borrowBorrowTime;
        this.borrowReturnTime = borrowReturnTime;
    }
    
    public String getBorrowId() {
        return borrowId;
    }
    
    public void setBorrowId(String borrowId) {
        this.borrowId = borrowId;
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
    
    public String getBorrowReborrowTime() {
        return borrowReborrowTime;
    }
    
    public void setBorrowReborrowTime(String borrowReborrowTime) {
        this.borrowReborrowTime = borrowReborrowTime;
    }
    
    public String getBorrowBorrowTime() {
        return borrowBorrowTime;
    }
    
    public void setBorrowBorrowTime(String borrowBorrowTime) {
        this.borrowBorrowTime = borrowBorrowTime;
    }
    
    public String getBorrowReturnTime() {
        return borrowReturnTime;
    }
    
    public void setBorrowReturnTime(String borrowReturnTime) {
        this.borrowReturnTime = borrowReturnTime;
    }
    
    @Override
    public String toString() {
        return "BorrowInfo{" +
                "borrowId='" + borrowId + '\'' +
                ", bookId='" + bookId + '\'' +
                ", bookName='" + bookName + '\'' +
                ", borrowReborrowTime='" + borrowReborrowTime + '\'' +
                ", borrowBorrowTime='" + borrowBorrowTime + '\'' +
                ", borrowReturnTime='" + borrowReturnTime + '\'' +
                '}';
    }
}
