package com.smartqaserver.service;

import java.util.List;

import com.smartqaserver.model.DTO.ServerUserDtlDTO;

public interface ServerUserService {

	List<ServerUserDtlDTO> getServerLoggedInUserDetails(String serverName) throws Exception;

	String forceLogOffServerUser(String serverName, String sessionID);

}
