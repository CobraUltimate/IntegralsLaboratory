//ServicioAutocompletado.java

import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;

public class Autocompletado{
    //Obteniendo la lista de palabras
    public ArrayList obtListaPalabras(){
        ArrayList palabras = new ArrayList();
        try
        {
        URL url = new URL("archivoXML.xml");
        SAXBuilder builder = new SAXBuilder();
        //File archivoXML = new File(url);
        Document documento = builder.build(url);
        
        //System.out.println();
        
        Element raiz = documento.getRootElement();
        List lista = raiz.getChildren("name");
            for(int i=0;i<lista.size();i++)
            {
             Element elemento=(Element)lista.get(i);
             String cadena=elemento.getTextTrim();
             palabras.add(cadena);
            }
        }
        catch(JDOMException e)
        {
        e.printStackTrace();
        }   
        catch (IOException e) 
        {		
        e.printStackTrace();
        }   
        return palabras;
    }	
}