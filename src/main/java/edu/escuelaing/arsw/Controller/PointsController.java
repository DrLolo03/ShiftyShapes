package edu.escuelaing.arsw.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.google.gson.Gson;

import edu.escuelaing.arsw.Cache.JsonInterpreter;
import edu.escuelaing.arsw.Cache.PointsCache;

@RestController
public class PointsController {

private PointsCache cache = PointsCache.getInstance();
    /**
     * Convierte los puntos recibidos como json a una cadena para que pueda ser operable por medio de gson
     * @param draws Recibe los puntos actuales del canvas
     */
    @PostMapping("/points")
    public void registerPoints(@RequestBody String draws){
        //System.out.println("1: "+ draws);
        Gson gson= new Gson();
        JsonInterpreter pointsarr= gson.fromJson(draws, JsonInterpreter.class); // Necesary to interpret the JSON object as ajava object
        cache.addPoints(pointsarr.getPoints());
        gson= null;
        
    }
    /**
     * llama un interpretador de json para utilizar gson y convertirlo a la cadena correspondiente 
     * @return el archivo json que fue convertido en cadena
     */
    @GetMapping("/points")
    public String processPoints(){
        //System.out.println("payload 2: "+ draws);
        JsonInterpreter currentData = new JsonInterpreter();
        currentData.setPoints(cache.getPoints());
        //System.out.println(points.getPoints());
        Gson gson= new Gson();
        String json= gson.toJson(currentData);
        //System.out.println("4: " +json);
        return json;
    }

    /**
     * Resive el llamado de limpiar el canvas y lo manda a limpiar
     */
    @PostMapping("/clear")
    public void clearPoints(){
        cache.clear();
    }
    static int getPort() {
        if (System.getenv("PORT") != null) {
            return Integer.parseInt(System.getenv("PORT"));
        }
        return 35000;
    }

}
