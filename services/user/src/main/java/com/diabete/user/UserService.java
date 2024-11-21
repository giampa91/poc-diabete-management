package com.diabete.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class UserService {

	private static List<User> userList;

	public UserService() {
		userList = new ArrayList<User>();
		User newUser = new User();
		newUser.setId(1);
		newUser.setName("John");
		newUser.setSurname("Snow");
		userList.add(newUser);
	}

	public UserDto getUser(long id) {
		return userList.stream()
				.filter(user -> user.getId() == id)
				.map(u -> toDto(u))
				.findAny()
				.orElseThrow(() -> new RuntimeException("user with id " + id + " not found"));
	}

	public UserDto toDto(User user) {
		UserDto dto = new UserDto();
		dto.setId(user.getId());
		dto.setName(user.getName());
		dto.setSurname(user.getSurname());
		return dto;
	}

}
