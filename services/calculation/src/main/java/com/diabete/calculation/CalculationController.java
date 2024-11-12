package com.diabete.calculation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
class CalculationController {
  
  @GetMapping("/Calculation/{carbohydrate}:{glycemia}")
  int getInsulinDose(@PathVariable int carbohydrate, @PathVariable int glycemia) {
	  return getInsulineDoseTest(carbohydrate, glycemia);
  }
  
  private int getInsulineDoseTest(int carbohydrate, int glycemia) {
	  return ((glycemia - 150) / 45) + (carbohydrate / 12);
  }
}