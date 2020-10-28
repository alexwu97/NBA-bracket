package bracket;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    private String userName;

    private String password;

    public User(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public Integer getUserID() {
        return userID;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String username) {
        this.userName = username;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
