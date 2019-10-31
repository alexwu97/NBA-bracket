package hello;

public class Teams {

    private String team;
    private String score;

    public Teams(String team, String score){
        this.team = team;
        this.score = score;
    }

    public String getTeam(){
        return this.team;
    }

    public String getScore(){
        return this.score;
    }

    public void setTeam(String team){
        this.team = team;
    }

    public void setScore(String score){
        this.score = score;
    }
}
