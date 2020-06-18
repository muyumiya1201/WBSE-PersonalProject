package ntou.cs.springboot.service;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ntou.cs.springboot.entity.QueryParameter;
import ntou.cs.springboot.entity.Testcase;
import ntou.cs.springboot.entity.TestcaseRequest;
import ntou.cs.springboot.exception.NotFoundException;
import ntou.cs.springboot.repository.TestcaseRepository;

@Service
public class TestcaseService {

	@Autowired
	private TestcaseRepository repository;

	public TestcaseService(TestcaseRepository repository) {
		this.repository = repository;
	}

	public Testcase getTestcase(String id) {
		return repository.findById(id).orElseThrow(() -> new NotFoundException("Can't find Testcase."));
	}

	public Testcase createTestcase(TestcaseRequest request) {
		Testcase testcase = new Testcase();
		testcase.setIdentification(request.getIdentification());
		testcase.setName(request.getName());
		testcase.setTestedTarget(request.getTestedTarget());
		testcase.setSeverity(request.getSeverity());
		testcase.setInput(request.getInput());
		testcase.setInstruction(request.getInstruction());
		testcase.setExpectedResult(request.getExpectedResult());
		testcase.setTestResult(request.getTestResult());

		return repository.insert(testcase);
	}

	public Testcase replaceTestcase(String identification, TestcaseRequest request) {
		List<Testcase> oldTestcase = findTestcase(identification);
		repository.deleteById(oldTestcase.get(0).getId());
		return createTestcase(request);
	}

	public List<Testcase> findTestcase(String identification) {
		return repository.findByIdentification(identification);
	}

	public void deleteTestcase(String id) {
		repository.deleteById(id);
	}

	public void deleteAllTestcase() {
		repository.deleteAll();
	}

	public List<Testcase> getTestcase(QueryParameter param) {
		String status = param.getStatus();
		String severity = param.getSeverity();

		Sort sort = null;
		Sort.Direction direction = Sort.Direction.ASC;
		sort = Sort.by(direction, "identification");

		return repository.findAll(sort);
	}

}
