package com.smartqaserver.service.impl;


import javax.annotation.Resource;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerPropertyDAO;
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DO.ServerPropertyFileChangeLogDO;
import com.smartqaserver.service.ServerPropertyService;

@Component
@Service("serverPropertyService")
public class ServerPropertyServiceImpl extends ITAPBaseServiceImpl implements
	ServerPropertyService {
	
	@Resource(name = "serverPropertyDAO")
	ServerPropertyDAO serverPropertyDAO;

	@Override
	public String getServerPropFolderPath(String serverName) throws ServiceException {
		String serverPropFolderPath = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			serverPropFolderPath = serverPropertyDAO.getServerPropFolderPath(serverName, managerUser);
			closeUserEntityManager(managerUser);
			return serverPropFolderPath;
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION, nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION, otherEx);
		}
	}

	@Override
	public void addPropertyFileChangeLog(String propName, String username) throws ServiceException {
		try {
			EntityManager managerUser = openUserEntityManager();
			
			ServerPropertyFileChangeLogDO serverPropertyFileChangeLogDO = new ServerPropertyFileChangeLogDO();
			
			serverPropertyFileChangeLogDO.setPropertyFileName(propName);
			serverPropertyFileChangeLogDO.setActionBy(username);
			
			String sts = serverPropertyDAO.addPropertyFileChangeLog(serverPropertyFileChangeLogDO, managerUser);
			closeUserEntityManager(managerUser);
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION, nullPointerEx);
		} catch (DAOException daoEx) {
			throw new ServiceException(daoEx.getErrorCode(), daoEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION, otherEx);
		}
	}
	
	
	
}
