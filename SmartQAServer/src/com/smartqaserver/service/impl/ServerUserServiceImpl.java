package com.smartqaserver.service.impl;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.smartqaserver.model.DTO.ServerUserDtlDTO;
import com.smartqaserver.service.ServerUserService;

@Component
@Service("serverUserService")
public class ServerUserServiceImpl extends ITAPBaseServiceImpl implements
		ServerUserService {

	@Override
	public List<ServerUserDtlDTO> getServerLoggedInUserDetails(String serverName)
			throws IOException, InterruptedException {

		String Userdtl;
		List<ServerUserDtlDTO> serverUserDtlDTOs = new ArrayList<ServerUserDtlDTO>();
		Process p = Runtime.getRuntime().exec(
				"query user /server:" + serverName);
		p.waitFor();
		BufferedReader reader = new BufferedReader(new InputStreamReader(
				p.getInputStream()));
		String line = reader.readLine();
		line = reader.readLine();//Skipping the first Row
		while (line != null) {
			ServerUserDtlDTO serverUserDtlDTO = new ServerUserDtlDTO();
			Userdtl = line.toString().replace("null", "");
			try {
				int length = Userdtl.length();
				String userDtlarray[] = new String[length];
				userDtlarray = Userdtl.split("\\s+");
				serverUserDtlDTO.setServerName(serverName);
				serverUserDtlDTO.setUserName(userDtlarray[1]);
				if(userDtlarray.length == 9){
					serverUserDtlDTO.setStatus(userDtlarray[4]);
				}else{
					serverUserDtlDTO.setStatus(userDtlarray[3]);
				}
				if(userDtlarray.length == 9){
					serverUserDtlDTO.setUserName(userDtlarray[1]);
					serverUserDtlDTO.setSessionName(userDtlarray[2]);
					serverUserDtlDTO.setSessionID(userDtlarray[3]);
					serverUserDtlDTO.setStatus(userDtlarray[4]);
					serverUserDtlDTO.setIdleTime(userDtlarray[5]);
					String logonTime = userDtlarray[6] + " " + userDtlarray[7] + " " + userDtlarray[8];
					serverUserDtlDTO.setLogonTime(logonTime);
					
				}else if(userDtlarray.length == 8){
					serverUserDtlDTO.setUserName(userDtlarray[1]);
					serverUserDtlDTO.setSessionName("");
					serverUserDtlDTO.setSessionID(userDtlarray[2]);
					serverUserDtlDTO.setStatus(userDtlarray[3]);
					serverUserDtlDTO.setIdleTime(userDtlarray[4]);
					String logonTime = userDtlarray[5] + " " + userDtlarray[6] + " " + userDtlarray[7];
					serverUserDtlDTO.setLogonTime(logonTime);
				}
				

			} catch (ArrayIndexOutOfBoundsException exp) {
			}
			serverUserDtlDTOs.add(serverUserDtlDTO);
			line = reader.readLine();
		}
		return serverUserDtlDTOs;

	}

	@Override
	public String forceLogOffServerUser(String serverName, String sessionID) {
		String status = "";
		//LOGOFF [sessionname | sessionid] [/SERVER:servername] [/V] [/VM]
		try {
			String cmd = "logoff " + sessionID + " /server:" + serverName + " /V";
			Runtime.getRuntime().exec(cmd);
			status = "Success";
		} catch (IOException e) {
			e.printStackTrace();
			status = "failed";
		}
		return status;
	}

}
