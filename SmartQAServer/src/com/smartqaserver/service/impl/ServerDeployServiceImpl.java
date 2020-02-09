package com.smartqaserver.service.impl;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import javax.annotation.Resource;
import javax.persistence.EntityManager;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.dao.ServerDeployDAO;
import com.smartqaserver.exception.ServiceException;
import com.smartqaserver.service.ServerDeployService;

@Component
@Service("serverDeployService")
public class ServerDeployServiceImpl extends ITAPBaseServiceImpl implements
		ServerDeployService {

	@Resource(name = "serverDeployDAO")
	ServerDeployDAO serverDeployDAO;

	@Override
	public String getWildFlyServerPath(String serverName)
			throws ServiceException {
		String wildflyAppServerPath = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			wildflyAppServerPath = serverDeployDAO.getWildFlyServerPath(
					serverName, managerUser);
			closeUserEntityManager(managerUser);
			return wildflyAppServerPath;
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION,
					nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION,
					otherEx);
		}
	}

	@Override
	public String getWildFlyServiceName(String serverName)
			throws ServiceException {
		String wildFlyServiceName = null;
		try {
			EntityManager managerUser = openUserEntityManager();
			wildFlyServiceName = serverDeployDAO.getWildFlyServiceName(
					serverName, managerUser);

			closeUserEntityManager(managerUser);
			return wildFlyServiceName;
		} catch (NullPointerException nullPointerEx) {
			throw new ServiceException(SmartQAConstants.NULL_POINTER_EXCEPTION,
					nullPointerEx);
		} catch (Exception otherEx) {
			throw new ServiceException(SmartQAConstants.SERVICE_EXCEPTION,
					otherEx);
		}
	}

	@Override
	public String deleteUnDeployedFile(String serverName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String startWildFlyService(String serverName, String serviceName) {
		String status = "";

		try {
			String cmd = "sc \\\\" + serverName + " start " + serviceName;
			Process p = Runtime.getRuntime().exec(cmd);
			p.waitFor();
			status = "Success";
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			status = "failed";
		}
		return status;
	}

	@Override
	public String stopWildFlyService(String serverName, String serviceName) {
		String status = "";

		try {
			String cmd = "sc \\\\" + serverName + " stop " + serviceName;
			Process p = Runtime.getRuntime().exec(cmd);
			p.waitFor();
			status = "Success";
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
			status = "failed";
		}
		return status;
	}

	@Override
	public String FetchServiceStatus(String serverName, String serviceName) {
		String status = "";
		String tempStatus = "";
		String serverDtl;
		try {
			String cmd = "sc \\\\" + serverName + " query " + serviceName;
			Process p = Runtime.getRuntime().exec(cmd);
			p.waitFor();
			BufferedReader reader = new BufferedReader(new InputStreamReader(
					p.getInputStream()));
			String line = reader.readLine();
			line = reader.readLine();
			line = reader.readLine();// Skipping the first two Rows
			line = reader.readLine();
			serverDtl = line.toString().replace("null", "");
			try {
				int length = serverDtl.length();
				String serverDtlarray[] = new String[length];
				serverDtlarray = serverDtl.split("\\s+");
				if (serverDtlarray.length == 5) {
					tempStatus = serverDtlarray[4];
				}
			} catch (ArrayIndexOutOfBoundsException exp) {
			}
			if ("RUNNING".equalsIgnoreCase(tempStatus)
					|| "START_PENDING".equalsIgnoreCase(tempStatus)
					|| tempStatus.contains("START")) {
				status = "Started";
			} else {
				status = "Stopped";
			}
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
		}
		return status;
	}

}
