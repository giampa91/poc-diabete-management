package com.diabete.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class GatewayApplication {
	
	@Bean
	  public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
	  return builder.routes()
		.route("glycemiaService", r -> r.path("/glycemia/**")
		  .filters(f -> f.stripPrefix(1))
		  .uri("lb://GLYCEMIA-SERVICE"))
	    .route("userService", r -> r.path("/user/**")
	      .filters(f -> f.stripPrefix(1))
	      .uri("lb://USER-SERVICE"))
	    .build();
	  }

	public static void main(String[] args) {
		SpringApplication.run(GatewayApplication.class, args);
	}

}
