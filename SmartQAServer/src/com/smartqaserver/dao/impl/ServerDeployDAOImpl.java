package com.smartqaserver.dao.impl;

import javax.persistence.EntityManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerDeployDAO;
import com.smartqaserver.exception.DAOException;

@Component
@Service("serverDeployDAO")
public class ServerDeployDAOImpl implements ServerDeployDAO {

	@Override
	public String getWildFlyServerPath(String serverName,
			EntityManager managerUser) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p.wildflyAppServerPath FROM ServerConfigDtlDO p WHERE 1=1 AND p.hostName='"+ serverName +"'");
			
			String wildflyAppServerPath = (String) managerUser.createQuery(query + "").getSingleResult();
			return wildflyAppServerPath;
		} catch (IllegalStateException illegalStateEx) {
			throw new DAOException(SmartQAConstants.NRE_ENTITY_MGR_FACTORY_CLOSED_EXCEPTION,
					illegalStateEx);
		} catch (IllegalArgumentException illegalArgEx) {
			throw new DAOException(SmartQAConstants.INVALID_QUERY_EXCEPTION, illegalArgEx);
		} catch (NullPointerException nullPointerEx) {
			throw new DAOException(SmartQAConstants.NULL_POINTER_EXCEPTION, nullPointerEx);
		} catch (Exception otherEx) {
			throw new DAOException(SmartQAConstants.DATABASE_EXCEPTION, otherEx);
		}
	}

	@Override
	public String getWildFlyServiceName(String serverName,
			EntityManager managerUser) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p.wildflyStartupServiceName FROM ServerConfigDtlDO p WHERE 1=1 AND p.hostName='"+ serverName +"'");
			
			String wildflyStartupServiceName = (String) managerUser.createQuery(query + "").getSingleResult();
			return wildflyStartupServiceName;
		} catch (IllegalStateException illegalStateEx) {
			throw new DAOException(SmartQAConstants.NRE_ENTITY_MGR_FACTORY_CLOSED_EXCEPTION,
					illegalStateEx);
		} catch (IllegalArgumentException illegalArgEx) {
			throw new DAOException(SmartQAConstants.INVALID_QUERY_EXCEPTION, illegalArgEx);
		} catch (NullPointerException nullPointerEx) {
			throw new DAOException(SmartQAConstants.NULL_POINTER_EXCEPTION, nullPointerEx);
		} catch (Exception otherEx) {
			throw new DAOException(SmartQAConstants.DATABASE_EXCEPTION, otherEx);
		}
	}
	
	
	
}
