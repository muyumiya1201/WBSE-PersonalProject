package ntou.cs.springboot.entity;

public class QueryParameter {
	private String status;

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "QueryParameter{" + "keyword='" + status + '\'' + ", orderedBy='" + status + '\'' + ", status='" + status
				+ '\'' + '}';
	}
}
