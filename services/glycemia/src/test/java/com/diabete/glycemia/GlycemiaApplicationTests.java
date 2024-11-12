package com.diabete.glycemia;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class GlycemiaApplicationTests {
	
	@Autowired
	GlycemiaService gliGlycemiaService;

	@Test
	void contextLoads() {
	}

//	@Test
//	void test() {
//		UserDto userDto = gliGlycemiaService.getUser(1);
//		System.out.println(userDto.getName() + " " + userDto.getSurname());
//	}

}
