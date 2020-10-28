package bracket;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "prediction")
public class Prediction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer predictionNo;

    private String userName;

    @Lob
    @Column(columnDefinition = "text")
    @Convert(converter = TeamListConverter.class)
    private List<Team> predictionList;

    public Integer getPredictionNo() {
        return predictionNo;
    }

    public String getUserName(){
        return userName;
    }

    public List<Team> getPredictionList(){
        return predictionList;
    }

    public void setPredictionNo(Integer predictionNo){
        this.predictionNo = predictionNo;
    }

    public void setUserName(String userName){
        this.userName = userName;
    }

    public void setPredictionList(List<Team> predictionList) {
        this.predictionList = predictionList;
    }
}
