package cors;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class Filter implements javax.servlet.Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response1 = (HttpServletResponse) response;
        response1.setHeader("Access-Control-Allow-Origin", "*");
        response1.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
        response1.setHeader("Access-Control-Max-Age", "3600");
        response1.setHeader("Access-Control-Allow-Headers", "x-requested-with");
        chain.doFilter(request, response);
    }
}
