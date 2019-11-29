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

public class DeleteExercise extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response){
        try{
            
            System.out.println("----------------- Autosave C: ----------------");
            
            response.setContentType("text/plain");
            PrintWriter out = response.getWriter();
            HttpSession session = request.getSession();
            String loggedUserId = (String)session.getAttribute("user");
            SAXBuilder builder = new SAXBuilder(); 
            Document document = builder.build(request.getServletContext().getResourceAsStream("/savedExercises.xml"));
            System.out.println(request.getQueryString());
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
                    System.out.println("exerciseid " + exerciseId);
                    for(int j = 0;j < exercises.size();j++){                                 
                        Element exercise = (Element) exercises.get(j);
                        if(exerciseId.equals(exercise.getAttributeValue("id"))){
                            
                            exercise.detach();
                            
                            XMLOutputter fmt = new XMLOutputter();
                            FileWriter writer = null;
                            while(writer == null){
                                try{
                                    ServletContext context = request.getServletContext();
                                    File savedExercises = new File(context.getRealPath("/savedExercises.xml"));
                                    System.out.println(savedExercises.getAbsolutePath());
                                    writer = new FileWriter(savedExercises);
                                    fmt.output(document, writer);
                                    writer.flush();
                                    writer.close();
                                }
                                catch(FileNotFoundException e){
                                    e.printStackTrace();
                                }
                            }
                            System.out.println("Element erased");
                        }
                        else{
                            System.out.println("Element not erased");
                        }
                        
                        try {
                            Thread.sleep(500);
                        } catch (InterruptedException ex) {
                            ex.printStackTrace();
                        }
                    }
                    response.sendRedirect("GetUserExercises");
                }
            }
            out.println("User not found");
        }
        catch(Exception exp){
            System.out.println(exp);
        }
    }
}