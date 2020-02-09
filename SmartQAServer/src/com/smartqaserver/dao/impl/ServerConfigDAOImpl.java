package com.smartqaserver.dao.impl;

import java.util.List;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerConfigDAO;
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.model.DO.ServerConfigDtlDO;

@SuppressWarnings("unchecked")
@Component
@Service("serverConfigDAO")
public class ServerConfigDAOImpl implements ServerConfigDAO {

	@Override
	public List<String> getServerDetails(EntityManager managerUser) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p.hostName FROM ServerConfigDtlDO p Where 1=1");
			
			List<String> serverNames = managerUser.createQuery(query + "").getResultList();
			return serverNames;
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
	public ServerConfigDtlDO getServerConfigDetail(
			EntityManager managerUser ,String serverName) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p FROM ServerConfigDtlDO p Where 1=1 AND p.hostName='"+ serverName + "'");
			
			ServerConfigDtlDO serverConfigDtlDO = (ServerConfigDtlDO) managerUser.createQuery(query + "").getSingleResult();
			return serverConfigDtlDO;
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
	public List<String> getWildFlyAppServerDetails(EntityManager managerUser) throws DAOException {
		try {
			StringBuffer query = new StringBuffer(
					"SELECT p.hostName FROM ServerConfigDtlDO p Where 1=1 AND p.wildflyAppServerPath IS NOT NULL AND p.wildflyStartupServiceName IS NOT NULL");
			
			List<String> serverNames = managerUser.createQuery(query + "").getResultList();
			return serverNames;
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
