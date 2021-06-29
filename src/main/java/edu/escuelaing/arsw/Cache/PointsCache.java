package edu.escuelaing.arsw.Cache;

import java.util.ArrayList;

public class PointsCache {
    private static PointsCache _instance = new PointsCache();
    private ArrayList<ArrayList<Double>> points = new ArrayList<>();

    private PointsCache(){}
    /**
     * @return instancia de la clase
     */
    public static PointsCache getInstance(){
        return _instance;
    }
    /**
     * recibe los puntos que de no estar en el canvas los añade a la lista de puntos
     * @param newPoints puntos del canvas
     */
    public void addPoints(ArrayList<ArrayList<Double>> newPoints){
        //System.out.println("5: "+ newPoints);
        for(ArrayList<Double> point: newPoints){
            if(!points.contains(point)){
                points.add(point);
            }
        }
    }
    /**
     * devuelve la lista con los puntos existentes
     * @return poins , la lista de puntos del canvas
     */
    public ArrayList<ArrayList<Double>> getPoints(){
        return points;
    }
    /**
     * Limpia la lista de puntos
     */
    public void clear(){
        points.clear();
    }

    
}
