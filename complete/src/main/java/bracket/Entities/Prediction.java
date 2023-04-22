package bracket.Entities;

import bracket.Model.Team;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Builder
@Document("predictions")
public class Prediction {
    @Id
    private String id;

    private String userName;

    private List<Team> predictionList;
}
