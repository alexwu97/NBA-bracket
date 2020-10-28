package bracket.Model;

public class Team {
    private String teamName;
    private String score;
    private String teamID;

    public Team(String teamName, String score, String teamID){
        this.teamName = teamName;
        this.score = score;
        this.teamID = teamID;
    }

    public String getScore() {
        return score;
    }

    public String getTeamName() {
        return teamName;
    }

    public String getTeamID() {
        return teamID;
    }

    public void setScore(String score) {
        this.score = score;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public void setTeamID(String teamID) {
        this.teamID = teamID;
    }
}
