package Servlets;


import java.io.*;
import java.util.List;
import javax.servlet.http.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.Attribute;

public class GetUserExercises extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response){
        try{
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            String loggedUserId = (String)session.getAttribute("user");
            SAXBuilder builder = new SAXBuilder(); 
            Document document = builder.build(request.getServletContext().getResourceAsStream("/savedExercises.xml"));

            Element root = document.getRootElement();
            System.out.println(root.getName());
            List users = (List)root.getChildren("user");
            String parameters = "?";
            for (int i = 0; i < users.size(); i++)
            {
                Element user = (Element) users.get(i);
                Attribute userId = user.getAttribute("id");
                out.println(userId);
                if(userId.getValue().equals(loggedUserId)){
                    List exercises = (List)user.getChildren("exercise");
                    for(int j = 0;j < exercises.size();j++){                                          
                        Element exercise = (Element) exercises.get(j);
                        String exerciseId = exercise.getAttribute("id").getValue();

                        String expression = exercise.getChildText("expression");
                        String xStart = exercise.getChildText("xStart");
                        String xFinal = exercise.getChildText("xFinal");
                        String creationDate = exercise.getChildText("creationDate");
                        parameters += "&exerciseId" + j + "=" + exerciseId + "&expression" + j + "=" + expression + "&xStart" + j + "=" + xStart + "&xFinal" + j + "=" + xFinal + "&creationDate" + j + "=" + creationDate ;
                    }
                    parameters += "&exercisesNumber=" + exercises.size();               
                    out.println("lel");
                    //response.sendRedirect("PresentationServlet"+parameters);
                    response.sendRedirect("exerciseWindow.html");
                    out.println("lal");
                    return;
                }
            }
            out.println("User not found");
        }
        catch(Exception exp){
            System.out.println(exp);
        }
    }
}