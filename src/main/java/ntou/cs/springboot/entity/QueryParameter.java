package ntou.cs.springboot.entity;

public class QueryParameter {
	private String status;
	private String severity;

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

	@Override
	public String toString() {
		return "QueryParameter{" + "status='" + status + '\'' + ", severity='" + severity + '\'' + ", status='" + status
				+ '\'' + '}';
	}
}
