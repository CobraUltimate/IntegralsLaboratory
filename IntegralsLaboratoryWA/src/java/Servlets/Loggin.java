package Servlets;

//AutocompletadoServlet.java

import Services.UserValidator;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;

public class Loggin extends HttpServlet{
	
        @Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException{
            String user = request.getParameter("user");
            String pass = request.getParameter("password");
            String userValidationResult = "";

            switch(UserValidator.validateUser(user, pass,this)){
                case -1:
                    userValidationResult = "Invalid XML";
                    break;
                case 0:
                    userValidationResult = "Invalid credentials";
                    break;
                case 1:
                    userValidationResult = "Correct user";
                    response.sendRedirect("exerciseWindow.html");
                    return;
            }
            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Servelet</title>");            
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>" + userValidationResult + "</h1>");
            out.println("</body>");
            out.println("</html>");
	}
}