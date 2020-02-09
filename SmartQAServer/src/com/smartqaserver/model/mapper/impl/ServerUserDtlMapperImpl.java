package com.smartqaserver.model.mapper.impl;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import com.smartqaserver.model.DO.ServerUserDtlDO;
import com.smartqaserver.model.DTO.ServerUserDtlDTO;
import com.smartqaserver.model.mapper.ServerUserDtlMapper;

@Component
@Service("serverUserDtlMapper")
public class ServerUserDtlMapperImpl implements ServerUserDtlMapper {
	
	private static final Logger LOGGER = Logger.getLogger(ServerUserDtlMapperImpl.class);

	@Override
	public ServerUserDtlDTO convertFromServerUserDtlDOToServerUserDtlDTO(
			ServerUserDtlDO serverUserDtlDO, ServerUserDtlDTO serverUserDtlDTO) {
		try {
			if (serverUserDtlDO.getId()>0) {
				serverUserDtlDTO.setId(serverUserDtlDO.getId());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDO.getServerName())) {
				serverUserDtlDTO.setServerName(serverUserDtlDO.getServerName());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDO.getUserName())) {
				serverUserDtlDTO.setUserName(serverUserDtlDO.getUserName());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDO.getStatus())) {
				serverUserDtlDTO.setStatus(serverUserDtlDO.getStatus());
			}
		} catch (Throwable t) {
			LOGGER.error(t.getMessage());
		}

		return serverUserDtlDTO;
	}

	@Override
	public ServerUserDtlDO convertFromServerUserDtlDTOToServerUserDtlDO(
			ServerUserDtlDTO serverUserDtlDTO, ServerUserDtlDO serverUserDtlDO) {

		try {
			if (serverUserDtlDTO.getId()>0) {
				serverUserDtlDO.setId(serverUserDtlDTO.getId());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDTO.getServerName())) {
				serverUserDtlDO.setServerName(serverUserDtlDTO.getServerName());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDTO.getUserName())) {
				serverUserDtlDO.setUserName(serverUserDtlDTO.getUserName());
			}
			if (StringUtils.isNotEmpty(serverUserDtlDTO.getStatus())) {
				serverUserDtlDO.setStatus(serverUserDtlDTO.getStatus());
			}
		} catch (Throwable t) {
			LOGGER.error(t.getMessage());
		}

		return serverUserDtlDO;
	}

	@Override
	public List<ServerUserDtlDTO> converServerUserDtlDOsToServerUserDtlDTOs(
			List<ServerUserDtlDO> serverUserDtlDOs) {

		ServerUserDtlDTO serverUserDtlDTO = null;
		List<ServerUserDtlDTO> serverUserDtlDTOs = null;
		if (null != serverUserDtlDOs) {
			serverUserDtlDTOs = new ArrayList<ServerUserDtlDTO>();
			for (ServerUserDtlDO serverUserDtlDO : serverUserDtlDOs) {
				serverUserDtlDTO = new ServerUserDtlDTO();
				serverUserDtlDTO = convertFromServerUserDtlDOToServerUserDtlDTO(serverUserDtlDO, serverUserDtlDTO);
				serverUserDtlDTOs.add(serverUserDtlDTO);
			}

		}
		return serverUserDtlDTOs;
	}
	
	
}
