package Servlets;


import java.io.*;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import javax.servlet.ServletContext;
import javax.servlet.http.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;
import org.jdom2.Attribute;
import org.jdom2.output.XMLOutputter;

public class CloneExercise extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response){
        try{
            response.setContentType("text/html");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            String loggedUserId = (String)session.getAttribute("user");
            SAXBuilder builder = new SAXBuilder(); 
            Document document = builder.build(request.getServletContext().getResourceAsStream("/savedExercises.xml"));
            System.out.println(request.getQueryString());
            Element root = document.getRootElement();
            System.out.println(root.getName());
            List users = (List)root.getChildren("user");
            for (int i = 0; i < users.size(); i++)
            {
                Element user = (Element) users.get(i);
                Attribute userId = user.getAttribute("id");
                out.println(userId);
                if(userId.getValue().equals(loggedUserId)){
                    List exercises = (List)user.getChildren("exercise");
                    
                    String location = request.getQueryString();
                    String expression = location.substring(location.indexOf("expression=") + "expression=".length());
                    if( expression.indexOf('&') > -1){
                        expression = expression.substring(0,expression.indexOf('&'));
                    }
                    
                    String currentDate = new SimpleDateFormat("dd-mmm-yyyy").format(new Date()); 
                    Element expressionElement = new Element("expression");
                    expressionElement.setText(expression);
                    Element xStart = new Element("xStart");
                    xStart.setText(request.getParameter("xStart"));
                    Element xFinal = new Element("xFinal");
                    xFinal.setText(request.getParameter("xFinal"));
                    Element creationDate = new Element("creationDate");
                    creationDate.setText(currentDate);
                    Element exercise = new Element("exercise");
                    exercise.setAttribute("id","" + exercises.size());
                    exercise.addContent(expressionElement);
                    exercise.addContent(xStart);
                    exercise.addContent(xFinal);
                    exercise.addContent(creationDate);
                    user.addContent(exercise);
                    
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
                    
                    response.sendRedirect("GetUserExercises");
                    
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