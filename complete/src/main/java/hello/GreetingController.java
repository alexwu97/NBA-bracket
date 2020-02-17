package hello;

import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.ui.Model;

import java.net.URI;
import java.sql.*;
import java.util.List;
import java.util.Map;
import java.util.*;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class GreetingController {

    Refnum reference_num = new Refnum(2);
    BracketUser user;

    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public String main(BracketUser userlog) {

        user = userlog;

        String connectionUrl = "jdbc:mysql://localhost:3306/nbabracket?serverTimezone=UTC";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(connectionUrl, "root", "password");

            String query = "select * from users where userID = ?";
            PreparedStatement preparedStmt = con.prepareStatement(query);
            preparedStmt.setString(1, user.getUserName());

            ResultSet rs = preparedStmt.executeQuery();

            if(rs.next()){

                query = "update users set password = ? where userID = ?";

                preparedStmt = con.prepareStatement(query);
                preparedStmt.setString(1, user.getPassword());
                preparedStmt.setString(2, user.getUserName());

                preparedStmt.executeUpdate();

            }else {

                query = "insert into users (userID, password)" + "values (?, ?)";

                preparedStmt = con.prepareStatement(query);
                preparedStmt.setString(1, user.getUserName());
                preparedStmt.setString(2, user.getPassword());

                preparedStmt.execute();

            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return "main";
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainGet(){return "main";}

    @RequestMapping(value = "/bracket", method = RequestMethod.GET)
    public String bracketGet(){return "bracket";}

    @RequestMapping(value = "/bracket", method = RequestMethod.POST)
    public ResponseEntity<Refnum> bracketPost(@RequestBody List<Map<String, String>> prediction){

        String connectionUrl = "jdbc:mysql://localhost:3306/nbabracket?serverTimezone=UTC";

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection(connectionUrl, "root", "password");

            String query = "insert into predictions (userID, predictionNo, team1, score1, team2, score2, team3, score3," +
                    " team4, score4, team5, score5, team6, score6, team7, score7, team8, score8, team9, score9," +
                    " team10, score10, team11, score11, team12, score12, team13, score13, team14, score14, team15, score15," +
                    " team16, score16, team17, score17, team18, score18, team19, score19, team20, score20, team21, score21," +
                    " team22, score22, team23, score23, team24, score24, team25, score25, team26, score26, team27, score27," +
                    " team28, score28, team29, score29, team30, score30)" + "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?" +
                    ", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?" +
                    ", ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement preparedStmt = con.prepareStatement(query);
            preparedStmt.setString(1, user.getUserName());
            reference_num.incrementNumber();
            preparedStmt.setInt(2, reference_num.getNumber());
            for (int i = 0; i < 30; i++){
                preparedStmt.setString(i*2 + 3, prediction.get(i).get("team"));
                preparedStmt.setString(i*2 + 4, prediction.get(i).get("score"));


            }
            preparedStmt.execute();

        } catch (Exception e) {
            e.printStackTrace();
        }


        return new ResponseEntity<>(reference_num, HttpStatus.OK);
    }

}


