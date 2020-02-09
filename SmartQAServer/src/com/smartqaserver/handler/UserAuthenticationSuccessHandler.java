/*---------------------------------------------------------------------------------------
 * Object Name: UserAuthenticationSuccessHandler.Java
 * 
 * Modification Block:
 * --------------------------------------------------------------------------------------
 * S.No. Name                Date      Bug Fix no. Desc
 * --------------------------------------------------------------------------------------
 * 1               12/06/15  NA          Created
 * --------------------------------------------------------------------------------------
 *
 * Copyright: 2015 <CapGemini>
 *---------------------------------------------------------------------------------------*/

package com.smartqaserver.handler;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Collection;
import java.util.StringTokenizer;
import java.util.concurrent.ConcurrentHashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import org.apache.log4j.Logger;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.util.JDBCPreparedStatementSelect;

/**
 * @author 
 *
 */
public class UserAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private static Logger LOGGER = Logger.getLogger(UserAuthenticationSuccessHandler.class);
	private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
	private ConcurrentHashMap<String, HttpSession> sessionMap = new ConcurrentHashMap<String, HttpSession> ();
	
	
	private String role = "";
	JDBCPreparedStatementSelect jd = new JDBCPreparedStatementSelect();

	public void setRedirectStrategy(RedirectStrategy redirectStrategy) {
		this.redirectStrategy = redirectStrategy;
	}

	protected RedirectStrategy getRedirectStrategy() {
		return redirectStrategy;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException {
		LOGGER.info(SmartQAConstants.SMARTQA_USER_AUTH_HANDLER
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_ONAUTH
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_ONAUTH_NO);
		
		
		UserDetails user = (UserDetails) authentication.getPrincipal();
        HttpSession session = request.getSession(false);
        if (session == null) {
               return;
        }
        String userName = user.getUsername();
        
        try {
			jd.updateLoginCount(userName);
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			LOGGER.error(e1.getMessage());
		}
        
        if(sessionMap.get(userName)==null){
        	sessionMap.put(userName, request.getSession());
        }else{
             //  if(sessionMap.get(user.getUsername()).isRequestedSessionIdValid()){
                     try{                 	 
                    	 HttpSession session1 = sessionMap.get(userName);                   			 
                    	 session1.invalidate();                               	  
                     }catch(IllegalStateException e){
                            System.out.println("session already invalidated");
                     }
              // }
               sessionMap.put(userName, request.getSession());
        }
		
		handle(request, response, authentication);
		
		//Setting Minerva Notification trigger on after successful Login
		request.getSession().setAttribute("sessionNotTri","ON");
		
		clearAuthenticationAttributes(request, authentication);

	}

	protected void handle(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException {
		LOGGER.info(SmartQAConstants.SMARTQA_USER_AUTH_HANDLER
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_HANDLE
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_HANDLE_NO);
		
		UserDetails user = (UserDetails) authentication.getPrincipal();
		
		String userName = user.getUsername();
			
		String targetUrl="";
		String blockedUserData = "";
		try {
			blockedUserData = jd.getBlockedUserData(userName);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			LOGGER.error(e.getMessage());
		}
		
		if("NO".equalsIgnoreCase(blockedUserData)){
			
			targetUrl = determineTargetUrl(authentication);
			
		}else if("YES".equalsIgnoreCase(blockedUserData)){
			
			targetUrl = "/logout?disabled=yes";	
			
		}else {
			
			targetUrl = determineTargetUrl(authentication);
		}
		
		
		if (response.isCommitted()) {
			return;
		}
		redirectStrategy.sendRedirect(request, response, targetUrl);
	}

	/**
	 * Builds the target URL according to the logic defined in the main class
	 * Javadoc.
	 */
	protected String determineTargetUrl(Authentication authentication) {
		LOGGER.info(SmartQAConstants.SMARTQA_USER_AUTH_HANDLER
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_TAR_URL
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_TAR_URL_NO);
		boolean isUser = false;
		boolean isAdmin = false;
		boolean isSuperAdmin = false;
		boolean isEnvAdmin = false;


		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
		for (GrantedAuthority grantedAuthority : authorities) {
			role = grantedAuthority.getAuthority();
			if (role.equals(SmartQAConstants.ROLE_USER)) {
				isUser = true;
				break;
			} else if (role.equals(SmartQAConstants.ROLE_ADMIN)) {
				isAdmin = true;
				break;
			} else if (role.equals(SmartQAConstants.ROLE_ENV_OWNR)) {
				isEnvAdmin = true;
				break;
			}else if (role.equals(SmartQAConstants.ROLE_SUPER_ADMIN)) {
				isSuperAdmin = true;
				break;
			}
		}
		if (isUser) {
			return "/smartQAHome";
		} else if (isAdmin) {
			return "/smartQAHome";
		} else if (isSuperAdmin) {
			return "/smartQAHome";
		} else if (isEnvAdmin) {
			return "/smartQAHome";
		} else {
			LOGGER.error(SmartQAConstants.SMARTQA_USER_AUTH_HANDLER
					+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_TAR_URL
					+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_TAR_URL_RETN);
			return "/login";
		}
	}

	protected void clearAuthenticationAttributes(HttpServletRequest request,
			Authentication authentication) {
		String username = "", role_in_id = "";
		LOGGER.info(SmartQAConstants.SMARTQA_USER_AUTH_HANDLER
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_CLR_AUTH
				+ SmartQAConstants.SMARTQA_USER_AUTH_HANDLER_CLR_AUTH_NO);
		HttpSession session = request.getSession(false);
		if (session == null) {
			return;
		}
		UserDetails user = (UserDetails) authentication.getPrincipal();
		try {
			String username_and_role = jd.selectRecordsFromTable(user.getUsername());
			StringTokenizer st = new StringTokenizer(username_and_role, "-");
			while (st.hasMoreTokens()) {
				username = st.nextToken();
				role_in_id = st.nextToken();
			}

		} catch (SQLException e1) {
			LOGGER.error(e1.getMessage());
		}
		session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
		request.getSession().setAttribute(SmartQAConstants.SESSION_UID, username);
		request.getSession().setAttribute(SmartQAConstants.ROLE, role_in_id);
	}

}
