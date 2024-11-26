package com.diabete.gateway;

import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AppConfig {
	
	@Bean
	@LoadBalanced
	public WebClient.Builder getWebClient(){
	    return WebClient.builder();
	}

    @Bean
    public CorsWebFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:8081"); // Replace with your frontend's domain
        config.addAllowedOrigin("http://example.com"); // Add other allowed domains as needed
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true); // Allows cookies or tokens

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsWebFilter(source);
    }
}