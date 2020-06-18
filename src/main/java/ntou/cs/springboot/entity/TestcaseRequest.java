package ntou.cs.springboot.entity;


public class TestcaseRequest {

	private String id;
	private String identification;
	private String name;
	private String testedTarget;
	private int severity;
	private String input;
	private String instruction;
	private String expectedResult;
	private int testResult;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIdentification() {
		return identification;
	}

	public void setIdentification(String identification) {
		this.identification = identification;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTestedTarget() {
		return testedTarget;
	}

	public void setTestedTarget(String testedTarget) {
		this.testedTarget = testedTarget;
	}

	public int getSeverity() {
		return severity;
	}

	public void setSeverity(int severity) {
		this.severity = severity;
	}

	public String getInput() {
		return input;
	}

	public void setInput(String input) {
		this.input = input;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}

	public String getExpectedResult() {
		return expectedResult;
	}

	public void setExpectedResult(String expectedResult) {
		this.expectedResult = expectedResult;
	}

	public int getTestResult() {
		return testResult;
	}

	public void setTestResult(int testResult) {
		this.testResult = testResult;
	}

}
