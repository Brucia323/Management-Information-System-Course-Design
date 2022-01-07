package utils;

public class ParameterTool {
    public static String[] toStringArry(String str) {
        str = str.substring(1, str.length() - 1);
        String[] result = str.split(",");
        return result;
    }
}
