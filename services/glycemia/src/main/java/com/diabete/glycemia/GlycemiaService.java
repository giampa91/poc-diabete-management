package com.diabete.glycemia;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GlycemiaService {

	private static String userUrl = "http://user-service";
	private static String calculationUrl = "http://calculation-service";

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

	public GlycemicValues insertGlycemicValues(GlycemicValuesDto glycemicValuesDto) {
		// check user
		UserDto userDto = getUser(glycemicValuesDto.getUserId());
		if (userDto == null)
			throw new RuntimeException("user " + glycemicValuesDto.getUserId() + " not found");

		// todo use mapper
		GlycemicValues testGlycemicValues = new GlycemicValues();
		testGlycemicValues.setCarbohydrate(glycemicValuesDto.getCarbohydrate());
		testGlycemicValues.setDateTime(LocalDateTime.now());
		testGlycemicValues.setGlycemia(glycemicValuesDto.getGlycemia());
		testGlycemicValues.setInsulinType(glycemicValuesDto.getInsulinType());
		testGlycemicValues.setDose(glycemicValuesDto.getDose());
		return testGlycemicValues;
	}

}
