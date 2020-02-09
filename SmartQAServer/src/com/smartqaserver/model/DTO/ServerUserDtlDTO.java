package com.smartqaserver.model.DTO;

public class ServerUserDtlDTO {

	private int id;
	private String serverName;
	private String userName;
	private String sessionName;
	private String sessionID;
	private String status;
	private String idleTime;
	private String LogonTime;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getServerName() {
		return serverName;
	}

	public void setServerName(String serverName) {
		this.serverName = serverName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSessionName() {
		return sessionName;
	}

	public void setSessionName(String sessionName) {
		this.sessionName = sessionName;
	}

	public String getSessionID() {
		return sessionID;
	}

	public void setSessionID(String sessionID) {
		this.sessionID = sessionID;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getIdleTime() {
		return idleTime;
	}

	public void setIdleTime(String idleTime) {
		this.idleTime = idleTime;
	}

	public String getLogonTime() {
		return LogonTime;
	}

	public void setLogonTime(String logonTime) {
		LogonTime = logonTime;
	}

}
