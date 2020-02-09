package com.smartqaserver.dao;

import javax.persistence.EntityManager;
import com.smartqaserver.exception.DAOException;

public interface ServerDeployDAO {

	String getWildFlyServerPath(String serverName, EntityManager managerUser) throws DAOException;

	String getWildFlyServiceName(String serverName, EntityManager managerUser) throws DAOException;
	
	
}
