//AutocompletadoServlet.java

package moduloautobd;

import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import java.io.IOException;
import moduloautobd.servicio.ServicioAutocompletado;
import java.io.PrintWriter;
import javax.servlet.http.HttpServlet;

public class userServlet extends HttpServlet{
	private ArrayList palabras;	

	public userServlet(){System.out.println("userServlet()");}
		
	public void init(ServletConfig config){}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response)
	throws ServletException, IOException{
		String prefijo = request.getParameter("names");
		
		//Obteniendo la lista de palabras del servicio de bd
		Autocompletado sa = new Autocompletado();
		palabras = sa.obtListaPalabras();

		//Obteniendo palabras similares
		ServicioComparador sc = ServicioComparador.obtInstancia(palabras);
		ArrayList similares = sc.buscarPalabras(prefijo);	
		
		if(similares.size() > 0){
			response.setContentType("text/xml");
			response.setHeader("Cache-Control","no-cache");
			PrintWriter salidar = response.getWriter();
                         salidar.println("<raiz>");
			PrintWriter salida = response.getWriter();
			
                        salida.println("<response>");
			
			for(int i = 0; i < similares.size(); i++){
				String palabra = (String)similares.get(i);
				salida.println("<name>" + palabra + "</name>");	
			}
                        salida.close();
			
			salida.println("</response1>");

                        PrintWriter salida1 = response.getWriter();
			salida1.println("<response1>");
				salida1.println("<pas>" + prefijo1 + "</pas>");	
			
			salida1.println("</response1>");
                          salida1.close();
                        salidar.println("</raiz>");
                        
                   salidar.close();	
		}else{
			response.setStatus(HttpServletResponse.SC_NO_CONTENT);
		}		
	}
}