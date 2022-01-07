package beans;

public class College {
    String collegeId;
    String collegeName;
    
    public College(String collegeId, String collegeName) {
        this.collegeId = collegeId;
        this.collegeName = collegeName;
    }
    
    public College() {
    }
    
    public String getCollegeId() {
        return collegeId;
    }
    
    public void setCollegeId(String collegeId) {
        this.collegeId = collegeId;
    }
    
    public String getCollegeName() {
        return collegeName;
    }
    
    public void setCollegeName(String collegeName) {
        this.collegeName = collegeName;
    }
    
    @Override
    public String toString() {
        return "College{" +
                "collegeId='" + collegeId + '\'' +
                ", collegeName='" + collegeName + '\'' +
                '}';
    }
}
