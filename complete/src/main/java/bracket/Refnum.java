package bracket;

public class Refnum {

    private static Refnum refnum = new Refnum(0);
    private int number;

    private Refnum(int number){
        this.number = number;
    }

    public static Refnum getInstance(){
        return refnum;
    }

    public int getNumber(){
        return this.number;
    }

    public void incrementNumber(){
        number++;
    }

}
