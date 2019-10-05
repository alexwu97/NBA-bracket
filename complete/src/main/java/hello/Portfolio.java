package hello;

public class Portfolio {
    private String firstname;
    private String password;

    public Portfolio(){

    }

    public Portfolio(String firstname, String password){
        this.firstname = firstname;
        this.password = password;
    }

    public String getfirstname(){
        return this.firstname;
    }

    public String getpassword() {
        return this.password;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

    public void setpassword(String password) {
        this.password = password;
    }

}

