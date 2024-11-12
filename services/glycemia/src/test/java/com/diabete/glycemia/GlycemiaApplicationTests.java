package com.diabete.glycemia;

import java.time.LocalDateTime;

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
//	void getUserTest() {
//		UserDto userDto = gliGlycemiaService.getUser(1);
//		System.out.println(userDto.getName() + " " + userDto.getSurname());
//	}
	
//	@Test
//	void getInsulinDoseTest() {
//		int dose = gliGlycemiaService.getInsulinDose(12, 200);
//		System.out.println(dose);
//	}
	
//	@Test
//	void insertGlycemicValuesTest() {
//		int dose = gliGlycemiaService.insertGlycemicValues(getTestGlycemicValue(), 1).getDose();
//		System.out.println(dose);
//	}
	
	private GlycemicValuesDto getTestGlycemicValue() {
		GlycemicValuesDto testGlycemicValues = new GlycemicValuesDto();
		  testGlycemicValues.setId(1);
		  testGlycemicValues.setCarbohydrate(24);
		  testGlycemicValues.setDateTime(LocalDateTime.now());
		  testGlycemicValues.setGlycemia(160);
		  testGlycemicValues.setInsulinType("fiasp");
		  testGlycemicValues.setDose(3);
		  return testGlycemicValues;
	  }

}
