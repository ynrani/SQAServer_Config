package com.smartqaserver.model.mapper;

import java.util.List;

import com.smartqaserver.model.DO.ServerUserDtlDO;
import com.smartqaserver.model.DTO.ServerUserDtlDTO;

public interface ServerUserDtlMapper {


	public ServerUserDtlDTO convertFromServerUserDtlDOToServerUserDtlDTO(ServerUserDtlDO serverUserDtlDO,
			ServerUserDtlDTO serverUserDtlDTO);

	public ServerUserDtlDO convertFromServerUserDtlDTOToServerUserDtlDO(ServerUserDtlDTO serverUserDtlDTO,
			ServerUserDtlDO serverUserDtlDO);

	public List<ServerUserDtlDTO> converServerUserDtlDOsToServerUserDtlDTOs(List<ServerUserDtlDO> serverUserDtlDOs);


}
