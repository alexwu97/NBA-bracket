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

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@Controller
public class GreetingController {

    @RequestMapping(value = "/groot", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<Portfolio> growt(@RequestBody Portfolio portfolio, Model model) {
        //model.addAttribute(portfolio);
        //JSONObject response = new JSONObject();
        //System.out.println(portfolio.toString());
        //HttpHeaders headers = new HttpHeaders();
        //headers.add("Content-Type", "string");

        return new ResponseEntity<>(portfolio, HttpStatus.OK);
    }

    @RequestMapping(value = "/greeting", method = RequestMethod.POST)
    public String greet(Portfolio portfolio, Model model){
        model.addAttribute("portfolio", portfolio);
        System.out.println(portfolio.getfirstname());
        return "greeting";
    }

    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public String main(BracketUser user) {
        System.out.println(user.getPassword());

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
    public ResponseEntity<List<Map<String, String>>> bracketPost(@RequestBody List<Map<String, String>> prediction, Model model){
        System.out.println(prediction.get(0).get("team"));
        return new ResponseEntity<>(prediction, HttpStatus.OK);
    }

}


