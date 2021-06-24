package edu.escuelaing.arsw;

public class PointsCache {
    private static PointsCache _instance = new PointsCache();

    private PointsCache(){}

    public static PointsCache getInstance(){
        return _instance;
    }
}
