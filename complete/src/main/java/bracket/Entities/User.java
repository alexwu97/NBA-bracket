package bracket.Entities;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
@Document("users")
public class User {
    @Id
    private String id;

    private String username;

    private String password;
}
