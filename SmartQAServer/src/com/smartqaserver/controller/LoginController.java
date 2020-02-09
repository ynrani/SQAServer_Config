/*---------------------------------------------------------------------------------------
 * Object Name: LoginController.Java
 * 
 * Modification Block:
 * --------------------------------------------------------------------------------------
 * S.No. Name                Date      Bug Fix no. Desc
 * --------------------------------------------------------------------------------------
 * 1               26/02/16  NA          Created
 * --------------------------------------------------------------------------------------
 *
 * Copyright: 2015 <CapGemini>
 *---------------------------------------------------------------------------------------*/

package com.smartqaserver.controller;


import java.security.Principal;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.util.DatabaseConnection;
import com.smartqaserver.util.JDBCPreparedStatementSelect;


@Controller
public class LoginController {

	private static final Logger LOGGER = Logger.getLogger(LoginController.class);
 

	@RequestMapping(value = {"/","/sessionExp","/login"}, method = RequestMethod.GET)
	public String Aunthenticate(ModelMap modelmap, HttpServletRequest request, HttpServletResponse response)  {
		
		
		return "login";
	}


	@RequestMapping("/403page")
	public String accessDe(ModelMap model, HttpServletRequest request, HttpServletResponse response) {
		LOGGER.info(SmartQAConstants.SMARTQA_LOGIN_CTLR + SmartQAConstants.SMARTQA_LOGIN_CTLR_GET
				+ SmartQAConstants.SMARTQA_LOGIN_CTLR_NO);
		return "smartQAAccessDenied";
	}
	
	@RequestMapping("/smartQAHome")
	public String smartqaHome(ModelMap model, HttpServletRequest request, HttpServletResponse response) {

		return "smartQAHome";
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping(SmartQAConstants.SMARTQA_LOGIN_AUTHFAIL)
	public String authFail() {
		System.out.println("auth fail");
		LOGGER.info(SmartQAConstants.SMARTQA_LOGIN_CTLR + SmartQAConstants.SMARTQA_LOGIN_CTLR_GET
				+ SmartQAConstants.SMARTQA_LOGIN_CTLR_NO);
		return SmartQAConstants.SMARTQA_LOGIN_VIEW;
	}

	/**
	 * 
	 * @return
	 */
	@RequestMapping(SmartQAConstants.SMARTQA_LOGIN_BACK)
	public String backToLogin() {
		LOGGER.info(SmartQAConstants.SMARTQA_LOGIN_CTLR + SmartQAConstants.SMARTQA_LOGIN_CTLR_GET
				+ SmartQAConstants.SMARTQA_LOGIN_CTLR_NO);
		return SmartQAConstants.SMARTQA_LOGIN_VIEW;
	}

	/**
	 * 
	 * @param model
	 * @param principal
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(SmartQAConstants.SMARTQA_LOOUT)
	public String logout(ModelMap model, Principal principal, HttpServletRequest request,
			HttpServletResponse response) {
		LOGGER.info(SmartQAConstants.SMARTQA_LOGIN_CTLR + SmartQAConstants.SMARTQA_LOGOUT_CTLR_GET
				+ SmartQAConstants.SMARTQA_LOGOUT_CTLR_NO);
		JDBCPreparedStatementSelect jd = new JDBCPreparedStatementSelect();
		System.out.println("logout");
		String view=SmartQAConstants.SMARTQA_LOGIN_VIEW;
		String currentUser = null;

		if (null != (String) request.getSession().getAttribute(SmartQAConstants.SESSION_UID)) {
			currentUser = (String) request.getSession().getAttribute(SmartQAConstants.SESSION_UID);
		}
		if (null != currentUser) {
			request.getSession().invalidate();
			try {
				int loginCount = jd.getLoginCount(currentUser);
				jd.updateUserLogoutDetails(currentUser,loginCount);
				request.logout();
			} catch (ServletException | SQLException e) {
				LOGGER.error(e.getMessage());
			}
			finally{
				DatabaseConnection.closeConnection();
				view=Aunthenticate(model,request,response);
			}
		}
		LOGGER.info(SmartQAConstants.SMARTQA_LOGIN_CTLR + SmartQAConstants.SMARTQA_LOGOUT_CTLR_GET
				+ SmartQAConstants.SMARTQA_LOGOUT_CTLR_NO);
		return view;
	}

}
