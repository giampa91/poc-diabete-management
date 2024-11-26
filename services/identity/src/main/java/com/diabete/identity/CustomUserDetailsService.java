package com.diabete.identity;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Component
public class CustomUserDetailsService implements UserDetailsService {

    //@Autowired
    //private UserCredentialRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Optional<UserCredential> credential = repository.findByName(username);
    	UserCredential userCredential = new UserCredential();
    	userCredential.setEmail("johnSnow@gmail.com");
    	userCredential.setId(1);
    	userCredential.setName("JohnSnow");
    	userCredential.setPassword(encoder.encode("password"));
    	
        Optional<UserCredential> credential = Optional.of(userCredential);
        return credential.map(CustomUserDetails::new).orElseThrow(() -> new UsernameNotFoundException("user not found with name :" + username));
    }
}