package com.diabete.glycemia;

import java.time.LocalDateTime;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GlycemiaService {

	private static String userUrl = "http://localhost";
	private static String userPort = "8081";

	private static String calculationUrl = "http://localhost";
	private static String calculationPort = "8083";

	WebClient userClient;
	WebClient calculationClient;

	public GlycemiaService() {
		userClient = WebClient.create(userUrl + ":" + userPort);
		calculationClient = WebClient.create(calculationUrl + ":" + calculationPort);
	}

	public UserDto getUser(long id) {
		return userClient.get().uri("/users/{id}", id).accept(MediaType.APPLICATION_JSON).retrieve()
				.toEntity(UserDto.class).block().getBody();
	}

	public int getInsulinDose(int carbohydrate, int glycemia) {
		return calculationClient.get().uri("/Calculation/{carbohydrate}:{glycemia}", carbohydrate, glycemia)
				.accept(MediaType.APPLICATION_JSON).retrieve().toEntity(Integer.class).block().getBody();
	}

	public GlycemicValues insertGlycemicValues(GlycemicValuesDto glycemicValuesDto) {
		// check user
		UserDto userDto = getUser(glycemicValuesDto.getUserId());
		if(userDto == null) throw new RuntimeException("user " + glycemicValuesDto.getUserId() + " not found");
		
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
