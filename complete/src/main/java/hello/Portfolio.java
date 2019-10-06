package hello;

public class Portfolio {
    private String username;
    private String password;

    public Portfolio(){

    }

    public Portfolio(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String getusername(){
        return this.username;
    }

    public String getpassword() {
        return this.password;
    }

    public void setusername(String username) {
        this.username = username;
    }

    public void setpassword(String password) {
        this.password = password;
    }

}

