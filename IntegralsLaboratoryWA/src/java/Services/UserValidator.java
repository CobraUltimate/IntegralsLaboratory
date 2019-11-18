//ServicioComparador.java

package Services;

import java.util.List;
import javax.servlet.http.HttpServlet;
import org.jdom2.Document;
import org.jdom2.Element;
import org.jdom2.input.SAXBuilder;

public class UserValidator{
    
    private static final short xmlNotFount = -1;
    private static final short invalidCredentials = 0;
    private static final short validationOk = 1;

    //buscar palabras similares
    public static short validateUser(String user,String password,HttpServlet request){
        try {
            
            SAXBuilder builder = new SAXBuilder(); 
            Document document = builder.build(request.getServletContext().getResourceAsStream("/users.xml"));
            
            Element rootNode = document.getRootElement();
            Element usersNode = rootNode.getChild("users");
            List users = (List)usersNode.getChildren("user");
            Element passwordsNode = rootNode.getChild("passwords");
            List passwords = (List)passwordsNode.getChildren("password");
            for (int i = 0; i < users.size(); i++) {
                Element userNode = (Element) users.get(i);
                request.log("User: " + userNode.getText());
                if(userNode.getText().equalsIgnoreCase(user)){
                    Element passwordNode = (Element) passwords.get(i);
                    if(passwordNode.getText().equals(password)){
                        return validationOk;
                    }
                }

            }
            
        } catch (Exception e) {
            e.printStackTrace();
            return xmlNotFount;
        }
        return invalidCredentials;
    }
}
