package com.diabete.glycemia;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/glycemia")
class GlycemiaController {

	@Autowired
	GlycemiaService glycemiaService;
	
	@GetMapping("/Glycemia")
	List<GlycemicValuesDto> findAll() {
		return glycemiaService.getGlicemicValuesList();
	}

	@PostMapping("/Glycemia")
	GlycemicValuesDto createGlycemicValues(@RequestBody GlycemicValuesCreateDto newGlycemicValues) {
		// add GlycemicValues
		return glycemiaService.createGlycemicValues(newGlycemicValues);
	}

	@PutMapping("/Glycemia/{id}")
	GlycemicValuesDto editGlycemicValues(@RequestBody GlycemicValuesDto editedGlycemicValues, @PathVariable Long id) {
		// edit GlycemicValues
		throw new RuntimeException("not implemented");
	}

	@DeleteMapping("/Glycemia/{id}")
	GlycemicValuesDto deleteGlycemicValues(@PathVariable Long id) {
		// delete GlycemicValues
		return glycemiaService.deleteGlycemicValues(id);
	}
}
