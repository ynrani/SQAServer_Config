package com.smartqaserver.model.DO;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "SERVER_CONFIG_DTL")
public class ServerConfigDtlDO {

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "HOST_NAME")
	private String hostName;

	@Column(name = "IP_ADDRESS")
	private String ipAddress;

	@Column(name = "SERVER_TYPE")
	private String serverType;

	@Column(name = "APP_URL")
	private String appURL;

	@Column(name = "JENKINS_URL")
	private String jenkinsURL;

	@Column(name = "WILDFLY_APP_SERVER_PATH")
	private String wildflyAppServerPath;
	
	@Column(name = "WILDFLY_STARTUP_SERVICE_NAME")
	private String wildflyStartupServiceName;

	@Column(name = "TOMCAT_APP_SERVER_PATH")
	private String tomcatAppServerPath;

	@Column(name = "JENKINS_PATH")
	private String jenkinsPath;

	@Column(name = "PROP_FOLDER_PATH")
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
