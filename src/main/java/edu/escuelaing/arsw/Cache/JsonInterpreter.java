package edu.escuelaing.arsw.Cache;

import java.util.*;

public class JsonInterpreter {
    private ArrayList<ArrayList<Double>> pointsarr;
    /**
     * Inicia en nulo la lista de puntos
     */
    public JsonInterpreter(){
        pointsarr= null;
    }
    /**
     * Devuelve la lista con puntos 
     * @return pointsarr , la lista con puntos
     */
    public ArrayList<ArrayList<Double>> getPoints() {
        return this.pointsarr;
    }
    /**
     * Establece pointsarr como los puntos que le entran
     * @param newPoints , lista de puntos 
     */
    public void setPoints(ArrayList<ArrayList<Double>> newPoints){
        this.pointsarr= newPoints;
    }

    /**
     * Limpia el contenido actual de la lista
     */
    public void clear(){
        this.pointsarr= null;
    }
}
