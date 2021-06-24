package edu.escuelaing.arsw;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PointsController {

private PointsCache points = PointsCache.getInstance();

    @PostMapping("/points")
    public String processPoints(@RequestBody String points){
        //System.out.println("payload : "+ points);
        return points;
    }
    
}
