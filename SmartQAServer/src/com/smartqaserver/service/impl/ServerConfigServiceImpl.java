package com.smartqaserver.service.impl;


import java.util.List;
import javax.annotation.Resource;
import javax.persistence.EntityManager;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerConfigDAO;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;
import com.smartqaserver.model.mapper.ServerConfigDtlMapper;
import com.smartqaserver.service.ServerConfigService;

@Component
@Service("serverConfigService")
public class ServerConfigServiceImpl extends ITAPBaseServiceImpl implements
		ServerConfigService {

	@Resource(name = "serverConfigDAO")
	ServerConfigDAO serverConfigDAO;
	
	@Resource(name = "serverConfigDtlMapper")
	ServerConfigDtlMapper serverConfigDtlMapper;

	@Override
	public List<String> getServerDetails() throws ServiceException {
		List<String> serverDetails = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			serverDetails = serverConfigDAO.getServerDetails(managerUser);
			closeUserEntityManager(managerUser);
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION,
					nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION,
					otherEx);
		}
		return serverDetails;
	}

	@Override
	public ServerConfigDtlDTO getServerConfigDetails(String serverName) throws ServiceException {
		ServerConfigDtlDTO serverConfigDtlDTO = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			serverConfigDtlDTO = serverConfigDtlMapper.convertFromServerConfigDtlDOToServerConfigDtlDTO(serverConfigDAO.getServerConfigDetail(managerUser, serverName), new ServerConfigDtlDTO());
			closeUserEntityManager(managerUser);
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION,
					nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION,
					otherEx);
		}
		return serverConfigDtlDTO;
	}

	@Override
	public List<String> getWildFlyAppServerDetails() throws ServiceException {
		List<String> serverDetails = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			serverDetails = serverConfigDAO.getWildFlyAppServerDetails(managerUser);
			closeUserEntityManager(managerUser);
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION,
					nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION,
					otherEx);
		}
		return serverDetails;
	}

}
