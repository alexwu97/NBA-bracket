package hello;

import java.util.List;
import java.util.Map;

public class Prediction {
    public List<Map<String, String>> predictionList;

    public Prediction(List<Map<String, String>> predictionList){
        this.predictionList = predictionList;
    }

    /*public void setPredictionList(List<Map<String, String>> predictionList){
        this.predictionList = predictionList;
    }

    public List<Map<String, String>> getPredictionList(){
        return this.predictionList;
    }*/

}
