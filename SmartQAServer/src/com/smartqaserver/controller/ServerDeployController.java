package com.smartqaserver.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.RegexFileFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.service.ServerConfigService;
import com.smartqaserver.service.ServerDeployService;

@Controller
public class ServerDeployController {

	@Resource(name = "serverConfigService")
	ServerConfigService serverConfigService;
	
	@Resource(name = "serverDeployService")
	ServerDeployService serverDeployService;

	@RequestMapping(value = "/smartQAServerDeployConfig", method = RequestMethod.GET)
	public String smartQAServerUserDetails(ModelMap modelmap,
			HttpServletRequest request, HttpServletResponse response)
			throws ServiceException {

		List<String> serverNames = serverConfigService.getWildFlyAppServerDetails();

		modelmap.addAttribute("serverNames", serverNames);

		return "smartQAServerDeployConfig";
	}
	
	@ResponseBody
	@RequestMapping(value = "/fetchWildFlyServerDetails", method = RequestMethod.GET)
	public List<String> fetchWildFlyServerDetails(@RequestParam(value = "serverName") String serverName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		List<String> serverFilesList = new ArrayList<String>();
		List<String> totalFilePath = new ArrayList<String>();
		
		
		String wildflyAppServerPath = serverDeployService.getWildFlyServerPath(serverName);
		
		if (wildflyAppServerPath.endsWith("\\")) {
			wildflyAppServerPath = wildflyAppServerPath + "standalone\\deployments";
		} else {
			wildflyAppServerPath = wildflyAppServerPath + "\\standalone\\deployments";
		}

		File folder = new File(wildflyAppServerPath);
		Collection<File> files = FileUtils.listFiles(folder, new RegexFileFilter("^(.*?)"),
				DirectoryFileFilter.DIRECTORY);

		Iterator<File> iterator = files.iterator();

		while (iterator.hasNext()) {
			File aName = iterator.next();
			if (aName.getName().contains(".war")) {
				serverFilesList.add(aName.getName());
				totalFilePath.add(aName.getName() + "*" + aName.getPath());
			}
		}
		request.getSession().setAttribute("ttlFilePath", totalFilePath);

		return serverFilesList;

	}
	
	
	@ResponseBody
	@RequestMapping(value = "/fetchWildFlyServiceName", method = RequestMethod.GET)
	public String fetchWildFlyServiceName(@RequestParam(value = "serverName") String serverName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String serviceName = serverDeployService.getWildFlyServiceName(serverName);

		return serviceName;

	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteUnDeployedFile", method = RequestMethod.GET)
	public String deleteUnDeployedFile(@RequestParam(value = "serverName") String serverName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String serviceName = serverDeployService.deleteUnDeployedFile(serverName);

		return serviceName;

	}
	
	@ResponseBody
	@RequestMapping(value = "/startWildFlyService", method = RequestMethod.GET)
	public String startWildFlyService(@RequestParam(value = "serverName") String serverName,@RequestParam(value = "serviceName") String serviceName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String Status = serverDeployService.startWildFlyService(serverName, serviceName);

		return Status;

	}
	
	@ResponseBody
	@RequestMapping(value = "/stopWildFlyService", method = RequestMethod.GET)
	public String stopWildFlyService(@RequestParam(value = "serverName") String serverName,@RequestParam(value = "serviceName") String serviceName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String Status = serverDeployService.stopWildFlyService(serverName, serviceName);

		return Status;

	}
	
	@ResponseBody
	@RequestMapping(value = "/FetchServiceStatus", method = RequestMethod.GET)
	public String FetchServiceStatus(@RequestParam(value = "serverName") String serverName,@RequestParam(value = "serviceName") String serviceName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String Status = serverDeployService.FetchServiceStatus(serverName, serviceName);

		return Status;

	}
	
	

}
