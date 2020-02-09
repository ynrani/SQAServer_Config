package com.smartqaserver.dao;

import java.util.List;

import javax.persistence.EntityManager;

import com.smartqaserver.exception.DAOException;
import com.smartqaserver.model.DO.ServerConfigDtlDO;

public interface ServerConfigDAO {

	List<String> getServerDetails(EntityManager managerUser) throws DAOException;

	ServerConfigDtlDO getServerConfigDetail(EntityManager managerUser, String serverName) throws DAOException;

	List<String> getWildFlyAppServerDetails(EntityManager managerUser) throws DAOException;

}
