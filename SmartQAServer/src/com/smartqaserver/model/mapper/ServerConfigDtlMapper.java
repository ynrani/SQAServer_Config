package com.smartqaserver.model.mapper;

import java.util.List;

import com.smartqaserver.model.DO.ServerConfigDtlDO;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;

public interface ServerConfigDtlMapper {


	public ServerConfigDtlDTO convertFromServerConfigDtlDOToServerConfigDtlDTO(ServerConfigDtlDO serverConfigDtlDO,
			ServerConfigDtlDTO serverConfigDtlDTO);

	public ServerConfigDtlDO convertFromServerConfigDtlDTOToServerConfigDtlDO(ServerConfigDtlDTO serverConfigDtlDTO,
			ServerConfigDtlDO serverConfigDtlDO);

	public List<ServerConfigDtlDTO> converServerConfigDtlDOsToServerConfigDtlDTOs(List<ServerConfigDtlDO> serverConfigDtlDOs);


}
