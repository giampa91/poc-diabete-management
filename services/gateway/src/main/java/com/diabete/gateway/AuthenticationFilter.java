package com.diabete.gateway;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config> {

	@Autowired
	private RouteValidator validator;

	@Autowired
	private WebClientService clientService;

	public AuthenticationFilter() {
		super(Config.class);
	}

	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange, chain) -> {
			if (validator.isSecured.test(exchange.getRequest())) {
				// Header contains token or not
				if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("Missing authorization header");
				}

				String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if (authHeader != null && authHeader.startsWith("Bearer ")) {
					authHeader = authHeader.substring(7);
				}

				// Make a non-blocking call to validate the token or get user info
				return clientService.validateToken(authHeader).doOnNext(user -> {
					System.out.println("User retrieved: " + user);
				}).then(chain.filter(exchange)) // Proceed with the filter chain
						.onErrorResume(e -> {
							System.out.println("Invalid access...!");
							return Mono.error(new RuntimeException("Unauthorized access to application", e));
						});
			}
			return chain.filter(exchange); // If not secured, just continue
		});
	}

	public static class Config {

	}
}
