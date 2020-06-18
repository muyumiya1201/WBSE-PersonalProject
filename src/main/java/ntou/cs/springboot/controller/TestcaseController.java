package ntou.cs.springboot.controller;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ntou.cs.springboot.entity.TestcaseRequest;
import ntou.cs.springboot.entity.QueryParameter;
import ntou.cs.springboot.entity.Testcase;
import ntou.cs.springboot.service.TestcaseService;

@RestController
@RequestMapping(value = "/testcase")
public class TestcaseController {

	@Autowired
	private TestcaseService testcaseService;

	@GetMapping(value = "/info")
	public String hello() {
		return "hello";
	}

	@PostMapping
	public ResponseEntity<Testcase> createTestcase(@Valid @RequestBody TestcaseRequest request) {
		Testcase testcase = testcaseService.createTestcase(request);

		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(testcase.getId())
				.toUri();

		return ResponseEntity.created(location).body(testcase);
	}

	@PutMapping(value = "/{id}")
	public ResponseEntity<Testcase> replaceTestcase(@PathVariable("id") String identification,
			@Valid @RequestBody TestcaseRequest request) {
		Testcase testcase = testcaseService.replaceTestcase(identification, request);
		return ResponseEntity.ok(testcase);
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Testcase> deleteTestcase(@PathVariable("id") String id) {
		testcaseService.deleteTestcase(id);
		return ResponseEntity.noContent().build();
	}

	@DeleteMapping
	public ResponseEntity<Testcase> deleteAllTestcase() {
		testcaseService.deleteAllTestcase();
		return ResponseEntity.noContent().build();
	}
	

	@GetMapping
	public ResponseEntity<List<Testcase>> getTestcase(@ModelAttribute QueryParameter param) {
		List<Testcase> testcase = testcaseService.getTestcase(param);
		return ResponseEntity.ok(testcase);
	}

}
