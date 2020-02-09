package com.smartqaserver.model.mapper.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.model.DO.ServerConfigDtlDO;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;
import com.smartqaserver.model.mapper.ServerConfigDtlMapper;

@Component
@Service("serverConfigDtlMapper")
public class ServerConfigDtlMapperImpl implements ServerConfigDtlMapper {
	
	private static final Logger LOGGER = Logger.getLogger(ServerConfigDtlMapperImpl.class);

	@Override
	public ServerConfigDtlDTO convertFromServerConfigDtlDOToServerConfigDtlDTO(
			ServerConfigDtlDO serverConfigDtlDO, ServerConfigDtlDTO serverConfigDtlDTO) {
		try {
			if (serverConfigDtlDO.getId()>0) {
				serverConfigDtlDTO.setId(serverConfigDtlDO.getId());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getHostName())) {
				serverConfigDtlDTO.setHostName(serverConfigDtlDO.getHostName());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getIpAddress())) {
				serverConfigDtlDTO.setIpAddress(serverConfigDtlDO.getIpAddress());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getServerType())) {
				serverConfigDtlDTO.setServerType(serverConfigDtlDO.getServerType());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getAppURL())) {
				serverConfigDtlDTO.setAppURL(serverConfigDtlDO.getAppURL());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getJenkinsURL())) {
				serverConfigDtlDTO.setJenkinsURL(serverConfigDtlDO.getJenkinsURL());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getWildflyAppServerPath())) {
				serverConfigDtlDTO.setWildflyAppServerPath(serverConfigDtlDO.getWildflyAppServerPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getWildflyStartupServiceName())) {
				serverConfigDtlDTO.setWildflyStartupServiceName(serverConfigDtlDO.getWildflyStartupServiceName());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getTomcatAppServerPath())) {
				serverConfigDtlDTO.setTomcatAppServerPath(serverConfigDtlDO.getTomcatAppServerPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getJenkinsPath())) {
				serverConfigDtlDTO.setJenkinsPath(serverConfigDtlDO.getJenkinsPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDO.getPropFolderPath())) {
				serverConfigDtlDTO.setPropFolderPath(serverConfigDtlDO.getPropFolderPath());
			}
		} catch (Throwable t) {
			LOGGER.error(t.getMessage());
		}

		return serverConfigDtlDTO;
	}

	@Override
	public ServerConfigDtlDO convertFromServerConfigDtlDTOToServerConfigDtlDO(
			ServerConfigDtlDTO serverConfigDtlDTO, ServerConfigDtlDO serverConfigDtlDO) {

		try {
			if (serverConfigDtlDTO.getId()>0) {
				serverConfigDtlDO.setId(serverConfigDtlDTO.getId());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getHostName())) {
				serverConfigDtlDO.setHostName(serverConfigDtlDTO.getHostName());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getIpAddress())) {
				serverConfigDtlDO.setIpAddress(serverConfigDtlDTO.getIpAddress());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getServerType())) {
				serverConfigDtlDO.setServerType(serverConfigDtlDTO.getServerType());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getAppURL())) {
				serverConfigDtlDO.setAppURL(serverConfigDtlDTO.getAppURL());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getJenkinsURL())) {
				serverConfigDtlDO.setJenkinsURL(serverConfigDtlDTO.getJenkinsURL());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getWildflyAppServerPath())) {
				serverConfigDtlDO.setWildflyAppServerPath(serverConfigDtlDTO.getWildflyAppServerPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getWildflyStartupServiceName())) {
				serverConfigDtlDO.setWildflyStartupServiceName(serverConfigDtlDTO.getWildflyStartupServiceName());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getTomcatAppServerPath())) {
				serverConfigDtlDO.setTomcatAppServerPath(serverConfigDtlDTO.getTomcatAppServerPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getJenkinsPath())) {
				serverConfigDtlDO.setJenkinsPath(serverConfigDtlDTO.getJenkinsPath());
			}
			if (StringUtils.isNotEmpty(serverConfigDtlDTO.getPropFolderPath())) {
				serverConfigDtlDO.setPropFolderPath(serverConfigDtlDTO.getPropFolderPath());
			}
		} catch (Throwable t) {
			LOGGER.error(t.getMessage());
		}

		return serverConfigDtlDO;
	}

	@Override
	public List<ServerConfigDtlDTO> converServerConfigDtlDOsToServerConfigDtlDTOs(
			List<ServerConfigDtlDO> serverConfigDtlDOs) {

		ServerConfigDtlDTO serverConfigDtlDTO = null;
		List<ServerConfigDtlDTO> serverConfigDtlDTOs = null;
		if (null != serverConfigDtlDOs) {
			serverConfigDtlDTOs = new ArrayList<ServerConfigDtlDTO>();
			for (ServerConfigDtlDO serverConfigDtlDO : serverConfigDtlDOs) {
				serverConfigDtlDTO = new ServerConfigDtlDTO();
				serverConfigDtlDTO = convertFromServerConfigDtlDOToServerConfigDtlDTO(serverConfigDtlDO, serverConfigDtlDTO);
				serverConfigDtlDTOs.add(serverConfigDtlDTO);
			}

		}
		return serverConfigDtlDTOs;
	}
	
	
}
