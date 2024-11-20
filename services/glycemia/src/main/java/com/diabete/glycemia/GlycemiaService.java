package com.diabete.glycemia;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GlycemiaService {

	private static String userUrl = "http://user-service";
	private static String calculationUrl = "http://calculation-service";
	private static long lastGeneratedidGlycemiaValue=1;
	private static List<GlycemicValues> glicemicValuesList = new ArrayList<GlycemicValues>();

	@Autowired
	WebClient.Builder webClient;

	public UserDto getUser(long id) {		
		return webClient.build()
        .get()
        .uri(userUrl + "/users/1")
        .retrieve()
        .bodyToMono(UserDto.class).block();
	}

	public int getInsulinDose(int carbohydrate, int glycemia) {
		return webClient.build().get().uri(calculationUrl+"/Calculation/{carbohydrate}:{glycemia}", carbohydrate, glycemia)
				.accept(MediaType.APPLICATION_JSON).retrieve().toEntity(Integer.class).block().getBody();
	}

	public GlycemicValuesDto createGlycemicValues(GlycemicValuesCreateDto dto) {
		// check user
		UserDto userDto = getUser(dto.getUserId());
		if (userDto == null)
			throw new RuntimeException("user " + dto.getUserId() + " not found");

		GlycemicValues newGlycemicValues = toGlycemicValues(dto);
		
		lastGeneratedidGlycemiaValue++;
		glicemicValuesList.add(newGlycemicValues);
		
		return toDto(newGlycemicValues);
	}
	
	public List<GlycemicValuesDto> getGlicemicValuesList(){
		return glicemicValuesList.stream().map(value -> toDto(value)).toList();
	}

	public GlycemicValuesDto deleteGlycemicValues(long id) {
		Optional<GlycemicValues> found = glicemicValuesList.stream().filter(el -> el.getId() == id).findAny();
		
		if(found.isPresent()) {
			glicemicValuesList = glicemicValuesList.stream().filter(el -> el.getId() != id).toList();
			return toDto(found.get());
		}
		throw new RuntimeException("glycemic data not found");
	}
	
	private GlycemicValuesDto toDto(GlycemicValues value) {
		// todo use mapper
		GlycemicValuesDto dto = new GlycemicValuesDto();
		dto.setId(value.getId());
		dto.setCarbohydrate(value.getCarbohydrate());
		dto.setDateTime(value.getDateTime());
		dto.setGlycemia(value.getGlycemia());
		dto.setInsulinType(value.getInsulinType());
		dto.setDose(value.getDose());
		dto.setUserId(value.getUserId());
		return dto;
	}
	
	private GlycemicValues toGlycemicValues(GlycemicValuesCreateDto dto) {
		// todo use mapper
		GlycemicValues newGlycemicValues = new GlycemicValues();
		newGlycemicValues.setId(lastGeneratedidGlycemiaValue);
		newGlycemicValues.setCarbohydrate(dto.getCarbohydrate());
		newGlycemicValues.setDateTime(LocalDateTime.now());
		newGlycemicValues.setGlycemia(dto.getGlycemia());
		newGlycemicValues.setInsulinType(dto.getInsulinType());
		newGlycemicValues.setDose(dto.getDose());
		return newGlycemicValues;
	}

}
