package com.smartqaserver.dao;

import javax.persistence.EntityManager;

import com.smartqaserver.exception.DAOException;
import com.smartqaserver.model.DO.ServerPropertyFileChangeLogDO;




public interface ServerPropertyDAO {

	String getServerPropFolderPath(String serverName, EntityManager managerUser) throws DAOException;

	String addPropertyFileChangeLog(
			ServerPropertyFileChangeLogDO serverPropertyFileChangeLogDO,
			EntityManager managerUser) throws DAOException;
	
	
}
