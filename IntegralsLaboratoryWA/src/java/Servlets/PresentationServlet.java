package Servlets;

//AutocompletadoServlet.java

import Services.UserValidator;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;

public class PresentationServlet extends HttpServlet{
	
        @Override
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException{
            int exercisesNumber = Integer.parseInt(request.getParameter("exercisesNumber"));
            response.setContentType("text/html;charset=UTF-8");
            PrintWriter out = response.getWriter();
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet Servelet</title>");            
            out.println("</head>");
            out.println("<body>");
            for (int i = 0; i < exercisesNumber; i++){
                String exerciseId = request.getParameter("exerciseId" + i);
                String expression = request.getParameter("expression" + i);
                String xStart = request.getParameter("xStart" + i);
                String xFinal = request.getParameter("xFinal" + i);
                String creationDate = request.getParameter("creationDate" + i);
                out.println("<p>ExerciseId: " + exerciseId + " expression: " + expression + " xStart: " + xStart + " xFinal: " + xFinal + " creationDate: " + creationDate + "</p><br/>");
            }
            out.println("</body>");
            out.println("</html>");
	}
}