package com.smartqaserver.model.DTO;

import java.util.List;

public class ServerPropertyFileDetailsDTO {

	private List<ServerPropertyFileDTO> serverPropertyFileDTO;

	public List<ServerPropertyFileDTO> getServerPropertyFileDTO() {
		return serverPropertyFileDTO;
	}

	public void setServerPropertyFileDTO(
			List<ServerPropertyFileDTO> serverPropertyFileDTO) {
		this.serverPropertyFileDTO = serverPropertyFileDTO;
	}

}
