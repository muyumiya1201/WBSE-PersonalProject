package ntou.cs.springboot.entity;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "order")
public class Order {

	private String id;
	private String missingId;
	private String missingContent;
	private String missingNumber;
	private String assignee;
	private int status;
	private String repairDescription;
	private int severity;

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
		return assignee;
	}

	public void setAssignee(String assignee) {
		this.assignee = assignee;
	}

	public String getRepairDescription() {
		return repairDescription;
	}

	public void setRepairDescription(String repairDescription) {
		this.repairDescription = repairDescription;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}
	
	public int getSeverity() {
		return severity;
	}

	public void setSeverity(int severity) {
		this.severity = severity;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", missingId=" + missingId + ", missingContent=" + missingContent + ", missingNumber=" + missingNumber + ", Assignee="
				+ assignee + ", repairDescription=" + repairDescription + ", severity=" + severity + ", status=" + status + "]";
	}

}
