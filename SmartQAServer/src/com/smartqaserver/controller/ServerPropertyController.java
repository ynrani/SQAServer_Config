package com.smartqaserver.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;

import javax.annotation.Resource;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.filefilter.DirectoryFileFilter;
import org.apache.commons.io.filefilter.RegexFileFilter;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.exception.BaseException;
import com.smartqaserver.exception.DAOException;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.model.DTO.ServerConfigDtlDTO;
import com.smartqaserver.model.DTO.ServerPropertyFileDTO;
import com.smartqaserver.model.DTO.ServerPropertyFileDetailsDTO;
import com.smartqaserver.model.DTO.ServerUserDtlDTO;
import com.smartqaserver.service.ServerConfigService;
import com.smartqaserver.service.ServerPropertyService;

@Controller
public class ServerPropertyController {

	@Resource(name = "serverConfigService")
	ServerConfigService serverConfigService;
	
	@Resource(name = "serverPropertyService")
	ServerPropertyService serverPropertyService;

	@RequestMapping(value = "/smartQAServerPropertyConfig", method = RequestMethod.GET)
	public String smartQAServerUserDetails(ModelMap modelmap,
			HttpServletRequest request, HttpServletResponse response)
			throws ServiceException {

		List<String> serverNames = serverConfigService.getServerDetails();

		modelmap.addAttribute("serverNames", serverNames);

		return "smartQAServerPropertyConfig";
	}
	
	@ResponseBody
	@RequestMapping(value = "/getPropertyFiles", method = RequestMethod.GET)
	public List<String> getPropertyFiles(
			@ModelAttribute("serverPropertyFileDetailsDTO") ServerPropertyFileDetailsDTO serverPropertyFileDetailsDTO,
			@RequestParam(value = "serverName") String serverName, HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		List<String> serverPropertyFilesList = new ArrayList<String>();
		List<String> totalFilePath = new ArrayList<String>();
		
		
		String serverLocation = serverPropertyService.getServerPropFolderPath(serverName);

		File folder = new File(serverLocation);
		Collection<File> files = FileUtils.listFiles(folder, new RegexFileFilter("^(.*?)"),
				DirectoryFileFilter.DIRECTORY);

		Iterator<File> iterator = files.iterator();

		while (iterator.hasNext()) {
			File aName = iterator.next();
			if (aName.getName().contains(".properties")) {
				serverPropertyFilesList.add(aName.getName().split(".properties")[0]);
				totalFilePath.add(aName.getName().split(".properties")[0] + "*" + aName.getPath());
			}
		}
		request.getSession().setAttribute("ttlFilePath", totalFilePath);

		return serverPropertyFilesList;

	}

	@ResponseBody
	@RequestMapping(value = "/getPropDetails", method = RequestMethod.GET)
	public ServerPropertyFileDetailsDTO getPropDetails(
			@ModelAttribute("serverPropertyFileDetailsDTO") ServerPropertyFileDetailsDTO serverPropertyFileDetailsDTO,
			HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "propName") String propName,
			ModelMap modelmap) throws DAOException, ServiceException, IOException {

		String path = "";
		String ttlFilePath = request.getSession().getAttribute("ttlFilePath").toString();
		String[] arrtech = ttlFilePath.toString().replace("[", "").replace("]", "").split(",");
		for (String var : arrtech) {
			String[] newArr = var.toString().split("\\*");
			String fName = newArr[0];
			String fValue = newArr[1];
			if (fName.trim().equalsIgnoreCase(propName.trim())) {
				path = fValue;
			}
		}
		request.getSession().setAttribute("selectedPropName", propName.trim());

		serverPropertyFileDetailsDTO = new ServerPropertyFileDetailsDTO();
		serverPropertyFileDetailsDTO.setServerPropertyFileDTO(new ArrayList<ServerPropertyFileDTO>());

		Properties prop = new Properties();
		InputStream input = null;

		try {

			File file = new File(path);
			input = new FileInputStream(file);
			if (input == null) {
				System.out.println("Sorry, unable to find " + path);
			}

			prop.load(input);

			Enumeration<?> e = prop.propertyNames();
			while (e.hasMoreElements()) {
				String key = (String) e.nextElement();
				String value = prop.getProperty(key);

				ServerPropertyFileDTO serverPropertyFileDTO = new ServerPropertyFileDTO();
				serverPropertyFileDTO.setKey(key);
				serverPropertyFileDTO.setValue(value);
				serverPropertyFileDetailsDTO.getServerPropertyFileDTO().add(serverPropertyFileDTO);

			}

		} catch (IOException ex) {
			ex.printStackTrace();
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return serverPropertyFileDetailsDTO;
	}

	@RequestMapping(value = "/SavePropertyFileDetails", method = RequestMethod.POST)
	public String SavePropertyFileDetails(
			@ModelAttribute("serverPropertyFileDetailsDTO") ServerPropertyFileDetailsDTO serverPropertyFileDetailsDTO,
			HttpServletRequest request, HttpServletResponse response, ModelMap model)
			throws ServletException, IOException, DAOException, ServiceException {

		String propName = request.getSession().getAttribute("selectedPropName").toString();

		String username = (String) request.getSession().getAttribute(SmartQAConstants.SESSION_UID);
		String path = "";
		String ttlFilePath = request.getSession().getAttribute("ttlFilePath").toString();
		String[] arrtech = ttlFilePath.toString().replace("[", "").replace("]", "").split(",");
		for (String var : arrtech) {
			String[] newArr = var.toString().split("\\*");
			String fName = newArr[0];
			String fValue = newArr[1];
			if (fName.trim().equalsIgnoreCase(propName.trim())) {
				path = fValue;
			}
		}

		Properties prop = new Properties();
		OutputStream output = null;
		try {
			output = new FileOutputStream(path);
			for (ServerPropertyFileDTO var : serverPropertyFileDetailsDTO.getServerPropertyFileDTO()) {
				prop.setProperty(var.getKey(), var.getValue());
			}
			prop.store(output, null);
			
			
			serverPropertyService.addPropertyFileChangeLog(propName, username);

		} catch (IOException io) {
			io.printStackTrace();
		} finally {
			if (output != null) {
				try {
					output.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}

		}
		return "redirect:smartQAServerPropertyConfig";
	}
	

}
