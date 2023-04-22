package bracket.Model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Team {
    private String teamName;
    private String score;
    private String teamID;

    public Team(String teamName, String score, String teamID){
        this.teamName = teamName;
        this.score = score;
        this.teamID = teamID;
    }
}
