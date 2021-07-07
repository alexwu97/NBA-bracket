package bracket;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalDefaultExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleContentNotAllowedException(Exception exception) {
        if(exception.getMessage().equals(PlayoffController.ERROR_MESSAGE_TEAM_SIZE)) {
            return handleNon30TeamException();
        }else if(exception.getMessage().equals(PlayoffController.ERROR_MESSAGE_MISSING_INFO)){
            return handleMissingTeamInfoException();
        }else if(exception.getMessage().equals(PlayoffController.ERROR_MESSAGE_NOT_FOUND_PREDICTION)){
            return handleNonFoundPrediction();
        }
        return new ResponseEntity<>("bad request", HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<String> handleNon30TeamException(){
        return new ResponseEntity<>("bad request: require exactly 30 teams", HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<String> handleMissingTeamInfoException(){
        return new ResponseEntity<>("bad request: missing information in team(s)", HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<String> handleNonFoundPrediction(){
        return new ResponseEntity<>("prediction number not found", HttpStatus.OK);
    }
}
