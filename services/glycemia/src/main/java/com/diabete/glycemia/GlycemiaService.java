package com.diabete.glycemia;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

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
	
	public UserDto getUser(int id) {
		return userClient.get()
				.uri("/users/{id}", id).accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.toEntity(UserDto.class)
				.block()
				.getBody();
	}
	
	public int getInsulinDose(int carbohydrate, int glycemia) {
		return calculationClient.get()
				.uri("/Calculation/{carbohydrate}:{glycemia}", carbohydrate, glycemia)
				.accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.toEntity(Integer.class)
				.block()
				.getBody();
	}

}
