package hello;

public class Refnum {

    private int number;

    public Refnum(int number){
        this.number = number;
    }

    public int getNumber(){
        return this.number;
    }

    public void setNumber(int number){
        this.number = number;
    }

    public void incrementNumber(){
        number++;
    }

}
