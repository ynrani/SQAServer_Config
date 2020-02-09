package com.smartqaserver.model.DTO;

public class ServerConfigDtlDTO {

	private int id;
	private String hostName;
	private String ipAddress;
	private String serverType;
	private String appURL;
	private String jenkinsURL;
	private String wildflyAppServerPath;
	private String wildflyStartupServiceName;
	private String tomcatAppServerPath;
	private String jenkinsPath;
	private String propFolderPath;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getHostName() {
		return hostName;
	}

	public void setHostName(String hostName) {
		this.hostName = hostName;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getServerType() {
		return serverType;
	}

	public void setServerType(String serverType) {
		this.serverType = serverType;
	}

	public String getAppURL() {
		return appURL;
	}

	public void setAppURL(String appURL) {
		this.appURL = appURL;
	}

	public String getJenkinsURL() {
		return jenkinsURL;
	}

	public void setJenkinsURL(String jenkinsURL) {
		this.jenkinsURL = jenkinsURL;
	}

	public String getWildflyAppServerPath() {
		return wildflyAppServerPath;
	}

	public void setWildflyAppServerPath(String wildflyAppServerPath) {
		this.wildflyAppServerPath = wildflyAppServerPath;
	}

	public String getTomcatAppServerPath() {
		return tomcatAppServerPath;
	}

	public void setTomcatAppServerPath(String tomcatAppServerPath) {
		this.tomcatAppServerPath = tomcatAppServerPath;
	}

	public String getJenkinsPath() {
		return jenkinsPath;
	}

	public void setJenkinsPath(String jenkinsPath) {
		this.jenkinsPath = jenkinsPath;
	}

	public String getPropFolderPath() {
		return propFolderPath;
	}

	public void setPropFolderPath(String propFolderPath) {
		this.propFolderPath = propFolderPath;
	}

	public String getWildflyStartupServiceName() {
		return wildflyStartupServiceName;
	}

	public void setWildflyStartupServiceName(String wildflyStartupServiceName) {
		this.wildflyStartupServiceName = wildflyStartupServiceName;
	}

}
