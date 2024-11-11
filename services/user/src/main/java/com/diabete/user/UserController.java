package com.diabete.user;


import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class UserController {

  @GetMapping("/users")
  List<User> findAll() {
    return List.of(getTestUser());
  }

  @PostMapping("/users")
  User newUser(@RequestBody User newUser) {
	// add user
	return getTestUser();
  }
  
  @GetMapping("/users/{id}")
  User findById(@PathVariable Long id) {
	  // find user
	  return getTestUser();
  }

  @PutMapping("/users/{id}")
  User editUser(@RequestBody User editedUser, @PathVariable Long id) {
	// edit user
	return getTestUser();
  }

  @DeleteMapping("/users/{id}")
  User deleteUser(@PathVariable Long id) {
    // delete user
	  return getTestUser();
  }
  
  private User getTestUser() {
	  User testUser = new User();
	  testUser.setId(1);
	  testUser.setName("John");
	  testUser.setSurname("Snow");
	  return testUser;
  }
}

