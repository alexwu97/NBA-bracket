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
        System.out.println(portfolio.getusername());
        return "greeting";
    }

    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public String main(Portfolio portfolio, Model model){
        System.out.print(portfolio.getusername());
        System.out.print(portfolio.getpassword());
        model.addAttribute("portfolio", portfolio);
        return "main";
    }

    @RequestMapping(value = "/bracket", method = RequestMethod.GET)
    public String bracketGet(){return "bracket";}

}


