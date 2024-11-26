package com.diabete.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Mono;

@Service
public class WebClientService {

	@Autowired
	private WebClient.Builder webClientBuilder;

	public Mono<String> validateToken(String token) {
		return webClientBuilder.baseUrl("http://IDENTITY-SERVICE").build().get().uri("/auth/validate?token=" + token).retrieve().bodyToMono(String.class);
	}

}
