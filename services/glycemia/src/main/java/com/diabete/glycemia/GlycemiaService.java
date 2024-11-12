package com.diabete.glycemia;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class GlycemiaService {
	
	private static String url = "http://localhost";
	private static String port = "8081";
	
	WebClient client;
	
	public GlycemiaService() {
		client = WebClient.create(url + ":" + port);
	}
	
	public UserDto getUser(int id) {
		return client.get()
				.uri("/users/{id}", id).accept(MediaType.APPLICATION_JSON)
				.retrieve()
				.toEntity(UserDto.class)
				.block()
				.getBody();
	}

}
