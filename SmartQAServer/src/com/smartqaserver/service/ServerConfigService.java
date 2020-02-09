package com.smartqaserver.service;

import java.util.List;

import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;

public interface ServerConfigService {

	List<String> getServerDetails() throws ServiceException;

	ServerConfigDtlDTO getServerConfigDetails(String serverName) throws ServiceException;

	List<String> getWildFlyAppServerDetails() throws ServiceException;


}
