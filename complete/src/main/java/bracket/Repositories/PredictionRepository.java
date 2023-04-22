package bracket.Repositories;

import bracket.Entities.Prediction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface PredictionRepository extends MongoRepository<Prediction, String> {
    Optional<Prediction> findItemById(String id);
}
