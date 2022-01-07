package dao;

import beans.College;
import beans.Major;
import beans.User;

import java.util.List;

public interface BasicMapper {
    //读取所有学生信息
    List<User> getAllStudent();
    
    //interface3.1
    List<College> getTotalCollege();
    
    //interface3.2
    List<Major> getTotalMajor();
}
