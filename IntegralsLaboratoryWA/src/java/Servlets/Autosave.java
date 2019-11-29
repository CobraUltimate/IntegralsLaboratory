package Servlets;


import java.io.*;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.Attribute;
import org.jdom2.Text;
import org.jdom2.output.XMLOutputter;

public class Autosave extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response){
        try{
            
            System.out.println("----------------- Autosave C: ----------------");
            
            response.setContentType("text/plain");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            String loggedUserId = (String)session.getAttribute("user");
            SAXBuilder builder = new SAXBuilder(); 
            Document document = builder.build(request.getServletContext().getResourceAsStream("/savedExercises.xml"));

            Element root = document.getRootElement();
            System.out.println("Seraching for the user");
            List users = (List)root.getChildren("user");
            for (int i = 0; i < users.size(); i++)
            {
                Element user = (Element) users.get(i);
                Attribute userId = user.getAttribute("id");
                out.println(userId);
                if(userId.getValue().equals(loggedUserId)){
                    System.out.println("User found");
                    List exercises = (List)user.getChildren("exercise");
                    String exerciseId = request.getParameter("exerciseId");
                    for(int j = 0;j < exercises.size();j++){                                          
                        Element exercise = (Element) exercises.get(j);
                        if(exerciseId.equals(exercise.getAttributeValue("id"))){
                            System.out.println("Exercise found");
                            
                            String location = request.getQueryString();
                            String expression = location.substring(location.indexOf("expression=") + "expression=".length());
                            if( expression.indexOf('&') > -1){
                                expression = expression.substring(0,expression.indexOf('&'));
                            }
                            System.out.println("Expression: " + expression);
                            System.out.println("xStart: " + request.getParameter("xStart"));
                            System.out.println("xFinal: " + request.getParameter("xFinal"));
                            exercise.getChild("expression").setText(expression);
                            exercise.getChild("xStart").setText(request.getParameter("xStart"));
                            exercise.getChild("xFinal").setText(request.getParameter("xFinal"));
                            
                            XMLOutputter fmt = new XMLOutputter();
                            FileWriter writer = null;
                            while(writer == null){
                                try{
                                    ServletContext context = request.getServletContext();
                                    File savedExercises = new File(context.getRealPath("/savedExercises.xml"));
                                    System.out.println(savedExercises.getAbsolutePath());
                                    writer = new FileWriter(savedExercises);
                                }
                                catch(FileNotFoundException e){
                                    e.printStackTrace();
                                    try {
                                        Thread.sleep(10000);
                                    } catch (InterruptedException ex) {

                                    }
                                }
                            }
                            fmt.output(document, writer);
                            writer.flush();
                            writer.close();
                            
                        }
                    }
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