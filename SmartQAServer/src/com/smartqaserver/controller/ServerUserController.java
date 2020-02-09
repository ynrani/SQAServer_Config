package com.smartqaserver.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.ServletException;
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
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DTO.ServerUserDtlDTO;
import com.smartqaserver.service.ServerConfigService;
import com.smartqaserver.service.ServerUserService;

@Controller
public class ServerUserController {

	@Resource(name = "serverConfigService")
	ServerConfigService serverConfigService;
	
	@Resource(name = "serverUserService")
	ServerUserService serverUserService;

	@RequestMapping(value = "/smartQAServerUserDetails", method = RequestMethod.GET)
	public String smartQAServerUserDetails(ModelMap modelmap,
			HttpServletRequest request, HttpServletResponse response)
			throws ServiceException {

		List<String> serverNames = serverConfigService.getServerDetails();

		modelmap.addAttribute("serverNames", serverNames);

		return "smartQAServerUserDetails";
	}
	
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)  
	@ResponseBody
	@RequestMapping(value = "/getServerLoggedInUserDetails")
	public List<ServerUserDtlDTO> getServerLoggedInUserDetails(@RequestParam(value = "serverName", required = false) String serverName, HttpServletRequest request, HttpServletResponse response)
			throws BaseException, Exception {
		List<ServerUserDtlDTO> serverUserDtlDTOs = new ArrayList<ServerUserDtlDTO>();
		serverUserDtlDTOs = serverUserService.getServerLoggedInUserDetails(serverName);
		return serverUserDtlDTOs;
	}
	
	@ResponseBody
	@RequestMapping(value = "/forceLogOffServerUser", method = RequestMethod.GET)
	public String forceLogOffServerUser(@RequestParam(value = "serverName") String serverName,@RequestParam(value = "sessionID") String sessionID, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String Status = serverUserService.forceLogOffServerUser(serverName, sessionID);

		return Status;

	}

}
