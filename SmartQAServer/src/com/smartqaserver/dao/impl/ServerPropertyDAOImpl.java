package com.smartqaserver.dao.impl;


import javax.persistence.EntityManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerPropertyDAO;
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.model.DO.ServerPropertyFileChangeLogDO;

@Component
@Service("serverPropertyDAO")
public class ServerPropertyDAOImpl implements ServerPropertyDAO {

	@Override
	public String getServerPropFolderPath(String serverName, EntityManager managerUser) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p.propFolderPath FROM ServerConfigDtlDO p Where 1=1 AND p.hostName='"+ serverName +"'");
			
			String serverPropFolderPath = (String) managerUser.createQuery(query + "").getSingleResult();
			return serverPropFolderPath;
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
	public String addPropertyFileChangeLog(
			ServerPropertyFileChangeLogDO serverPropertyFileChangeLogDO,
			EntityManager managerUser) throws DAOException {
		try {
			if (null != managerUser) {
				managerUser.getTransaction().begin();
				serverPropertyFileChangeLogDO = managerUser.merge(serverPropertyFileChangeLogDO);
				managerUser.getTransaction().commit();
			}

			return "SUCCESS";
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
