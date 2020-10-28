package bracket;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.thymeleaf.util.StringUtils;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.Collections;
import java.util.List;

@Converter
public class TeamListConverter implements AttributeConverter<List<Team>, String> {
    private static final Gson GSON = new Gson();

    @Override
    public String convertToDatabaseColumn(List<Team> teams) {
        if (teams == null) {
            return "[]";
        }
        return GSON.toJson(teams);
    }

    @Override
    public List<Team> convertToEntityAttribute(String s) {
        if (StringUtils.isEmpty(s)) {
            return Collections.emptyList();
        }
        return GSON.fromJson(s, new TypeToken<List<Team>>() {
        }.getType());
    }
}

