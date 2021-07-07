package bracket;

import bracket.Entities.Prediction;
import bracket.Entities.User;
import bracket.Model.Team;
import bracket.Repositories.PredictionRepository;
import bracket.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@Controller
public class PlayoffController {
    final static int PREDICTION_TEAM_SIZE = 30;
    final static String ERROR_MESSAGE_TEAM_SIZE = "no 30 teams";
    final static String ERROR_MESSAGE_MISSING_INFO = "missing team info";
    final static String ERROR_MESSAGE_NOT_FOUND_PREDICTION = "prediction not found";

    @Autowired
    private PredictionRepository predictionRepository;

    @Autowired
    private UserRepository userRepository;

    //this application does not have session built for users. For simplicity, an object tracks the user instead
    User user = null;

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainGet() {
        return "main";
    }

    @RequestMapping(value = "/main", method = RequestMethod.POST)
    public String main(User user) {
        this.user = userRepository.save(user);
        return "main";
    }

    @RequestMapping(value = "/bracket", method = RequestMethod.GET)
    public String bracketGet() {
        return "bracket";
    }

    @RequestMapping(value = "/bracket", method = RequestMethod.POST)
    public ResponseEntity<Integer> bracketPost(@RequestBody List<Team> userPrediction) throws Exception {
        if(userPrediction.size() != PREDICTION_TEAM_SIZE){
            throw new Exception(ERROR_MESSAGE_TEAM_SIZE);
        }
        for(Team team : userPrediction){
            if(team.getScore() == null || team.getTeamID() == null || team.getTeamName() == null) {
                throw new Exception(ERROR_MESSAGE_MISSING_INFO);
            }
        }
        Prediction prediction = new Prediction();
        prediction.setUserName(user == null ? "guest" : user.getUserName());
        prediction.setPredictionList(userPrediction);

        Prediction predict = predictionRepository.save(prediction);

        return new ResponseEntity<>(predict.getPredictionNo(), HttpStatus.OK);
    }

    @RequestMapping(value = "/display", method = RequestMethod.GET)
    public String displayGet() {
        return "display";
    }

    @RequestMapping(value = "/display/{search}", method = RequestMethod.GET)
    public ResponseEntity<?> providePrediction(@PathVariable("search") String search) throws Exception{
        Optional<Prediction> queriedPrediction = predictionRepository.findById(Integer.parseInt(search));
        Prediction prediction = null;
        if (queriedPrediction.isPresent()) {
            prediction = queriedPrediction.get();
        }else{
            throw new Exception(ERROR_MESSAGE_NOT_FOUND_PREDICTION);
        }
        return new ResponseEntity<>(prediction, HttpStatus.OK);
    }
}


