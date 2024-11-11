package com.diabete.glycemia;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
class GlycemiaController {

  @GetMapping("/Glycemia")
  List<GlycemicValues> findAll() {
    return List.of(getTestGlycemicValue());
  }

  @PostMapping("/Glycemia")
  GlycemicValues newGlycemicValues(@RequestBody GlycemicValues newGlycemicValues) {
	// add GlycemicValues
	return getTestGlycemicValue();
  }
  
  @GetMapping("/Glycemia/{id}")
  GlycemicValues findById(@PathVariable Long id) {
	  // find GlycemicValues
	  return getTestGlycemicValue();
  }

  @PutMapping("/Glycemia/{id}")
  GlycemicValues editGlycemicValues(@RequestBody GlycemicValues editedGlycemicValues, @PathVariable Long id) {
	// edit GlycemicValues
	return getTestGlycemicValue();
  }

  @DeleteMapping("/Glycemia/{id}")
  GlycemicValues deleteGlycemicValues(@PathVariable Long id) {
    // delete GlycemicValues
	  return getTestGlycemicValue();
  }
  
  private GlycemicValues getTestGlycemicValue() {
	  GlycemicValues testGlycemicValues = new GlycemicValues();
	  testGlycemicValues.setId(1);
	  testGlycemicValues.setCarbohydrate(24);
	  testGlycemicValues.setDateTime(LocalDateTime.now());
	  testGlycemicValues.setGlycemia(160);
	  testGlycemicValues.setInsulinType("fiasp");
	  return testGlycemicValues;
  }
}

