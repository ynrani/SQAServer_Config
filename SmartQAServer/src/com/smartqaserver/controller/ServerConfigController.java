package com.smartqaserver.controller;

import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.smartqaserver.exception.BaseException;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;
import com.smartqaserver.service.ServerConfigService;

@Controller
public class ServerConfigController {

	@Resource(name = "serverConfigService")
	ServerConfigService serverConfigService;
	
	@RequestMapping(value = "/smartQAServerConfig", method = RequestMethod.GET)
	public String smartQAServerConfig(ModelMap modelmap,
			HttpServletRequest request, HttpServletResponse response)
			throws ServiceException {

		List<String> serverNames = serverConfigService.getServerDetails();

		modelmap.addAttribute("serverNames", serverNames);

		return "smartQAServerConfig";
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)  
	@ResponseBody
	@RequestMapping(value = "/getServerConfigDetails")
	public ServerConfigDtlDTO getServerConfigDetails(@RequestParam(value = "serverName", required = false) String serverName, HttpServletRequest request, HttpServletResponse response)
			throws BaseException, Exception {
		ServerConfigDtlDTO serverConfigDtlDTO = new ServerConfigDtlDTO();
		serverConfigDtlDTO = serverConfigService.getServerConfigDetails(serverName);
		return serverConfigDtlDTO;
	}
	
	

}
