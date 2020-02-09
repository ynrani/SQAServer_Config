package com.smartqaserver.service;

import com.smartqaserver.exception.ServiceException;


public interface ServerDeployService {

	String getWildFlyServerPath(String serverName) throws ServiceException;

	String getWildFlyServiceName(String serverName) throws ServiceException;

	String deleteUnDeployedFile(String serverName);

	String startWildFlyService(String serverName, String serviceName);

	String stopWildFlyService(String serverName, String serviceName);

	String FetchServiceStatus(String serverName, String serviceName);


}
