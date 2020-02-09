package com.smartqaserver.service;

import com.smartqaserver.exception.ServiceException;


public interface ServerPropertyService {

	String getServerPropFolderPath(String serverName) throws ServiceException;

	void addPropertyFileChangeLog(String propName, String username) throws ServiceException;



}
