package ntou.cs.springboot.entity;

public class OrderRequest {

	private String id;
	private String missingId;
	private String missingContent;
	private String missingNumber;
	private String Assignee;
	private String status;
	private String repairDescription;
	private String severity;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getMissingId() {
		return missingId;
	}

	public void setMissingId(String missingId) {
		this.missingId = missingId;
	}

	public String getMissingContent() {
		return missingContent;
	}

	public void setMissingContent(String missingContent) {
		this.missingContent = missingContent;
	}

	public String getMissingNumber() {
		return missingNumber;
	}

	public void setMissingNumber(String missingNumber) {
		this.missingNumber = missingNumber;
	}

	public String getAssignee() {
		return Assignee;
	}

	public void setAssignee(String Assignee) {
		this.Assignee = Assignee;
	}

	public String getRepairDescription() {
		return repairDescription;
	}

	public void setRepairDescription(String repairDescription) {
		this.repairDescription = repairDescription;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	public String getSeverity() {
		return severity;
	}

	public void setSeverity(String severity) {
		this.severity = severity;
	}
}
