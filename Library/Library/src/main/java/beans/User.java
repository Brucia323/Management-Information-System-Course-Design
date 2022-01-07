package beans;

public class User {
    private String userId;
    private String majorId;
    private String collegeId;
    private String userName;
    private String userPwd;
    private int userIdentity;
    
    public User() {
    }
    
    public User(String userId, String majorId, String collegeId, String userName, String userPwd, int userIdentity) {
        this.userId = userId;
        this.majorId = majorId;
        this.collegeId = collegeId;
        this.userName = userName;
        this.userPwd = userPwd;
        this.userIdentity = userIdentity;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getMajorId() {
        return majorId;
    }
    
    public void setMajorId(String majorId) {
        this.majorId = majorId;
    }
    
    public String getCollegeId() {
        return collegeId;
    }
    
    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserPwd() {
        return userPwd;
    }
    
    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }
    
    public int getUserIdentity() {
        return userIdentity;
    }
    
    public void setUserIdentity(int userIdentity) {
        this.userIdentity = userIdentity;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", majorId='" + majorId + '\'' +
                ", collegeId='" + collegeId + '\'' +
                ", userName='" + userName + '\'' +
                ", userPwd='" + userPwd + '\'' +
                ", userIdentity=" + userIdentity +
                '}';
    }
}
