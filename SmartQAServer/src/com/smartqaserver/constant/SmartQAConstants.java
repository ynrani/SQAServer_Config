/*---------------------------------------------------------------------------------------
 * Object Name: SmartQAConstants.Java
 * 
 * --------------------------------------------------------------------------------------
 *
 * Copyright: 2016 Capgemini Financial Services
 *---------------------------------------------------------------------------------------*/

package com.smartqaserver.constant;

/**
 * Class which will provides the String final constants i.e JSP names, request
 * handler mappings, request parameters , strings and error codes.
 */

public final class SmartQAConstants {
	public static final String SCOPE_SESSION = "session";

	public static final int BUFFER_SIZE = 4096;

	public static final String UNCHECKED = "unchecked";

	public static final String MM_DD_YYYY = "MM/dd/yyyy";
	public static final String DD_MM_YYYY = "dd/MM/yyyy";
	public static final String DDMMYYYY_HHMMSS = "dd-MM-yyyy hh:mm:ss a zzz";
	public static final String dd_MM_yyyy = "dd-MM-yyyy";

	public static final String ERROR_MESSAGE = "Exception Occurred Contact Admin!!!";
	public static final String ERROR = "error";
	public static final String NO_RECORDS = "No Records found";

	public static final String EXCEPTION_ADMIN = "Exception Occurred Contact Admin!!!";

	// DB

	// Prams
	public static final String SESSION_UID = "UserId";
	public static final String SESSION_UNAME = "UserName";

	public static final String ROLE = "ROLE";
	public static final String ROLE_ADMIN = "ROLE_ADMIN";
	public static final String ROLE_USER = "ROLE_USER";
	public static final String ROLE_ENV_OWNR = "ROLE_ENV_OWNR";
	public static final String ROLE_SUPER_ADMIN = "ROLE_SUPER_ADMIN";
	public static final String ROLE_INVALID = "ROLE_INVALID";

	public static final String SMARTQA_LOGIN_REDIRECT = "login:redirect?accessDenied=true";
	public static final String SMARTQA_LOGIN_SESSIONEXP = "/sessionExp";
	public static final String SMARTQA_LOGIN_AUTHFAIL = "/authFail";
	public static final String SMARTQA_LOGIN_BACK = "/back";
	public static final String SMARTQA_LOOUT = "/logout";

	public static final String LOGOUT = "logout";
	public static final String INVALID_UNAME_PASS = "Invalid username and password!";
	public static final String LOGOUT_SUCCESS = "You've been logged out successfully.";
	public static final String SESSION_EXPIRED = "You are not allowed to perform 'Back' or You have not logged in or Session Expired.";
	public static final String NEW_USER = "You are not a registered user, Please request for providing the access.";

	// Vies
	public static final String SMARTQA_LOGIN_VIEW = "login";

	public static final String NRE_ENTITY_MGR_FACTORY_CLOSED_EXCEPTION = "NRE_0106";
	public static final String INVALID_QUERY_EXCEPTION = "11200";
	public static final String NULL_POINTER_EXCEPTION = "11201";
	public static final String DATABASE_EXCEPTION = "11202";
	public static final String SERVICE_EXCEPTION = "11203";
	public static final String IE_EXCEPTION = "11204";
	public static final String PARSE_EXCEPTION = "11205";

	public static final String PERSISTENCE_UNIT_USER = "userPersistenceUnit";

	// DB

	// Logger classes

	public static final String SMARTQA_LOGIN_CTLR = "~ LoginController ~";
	public static final String SMARTQA_LOGIN_CTLR_GET = "~ login ~";
	public static final String SMARTQA_LOGIN_CTLR_YES = "~ login Params:Yes ~";
	public static final String SMARTQA_LOGIN_CTLR_NO = "~ Params:No ~";

	public static final String SMARTQA_LOGOUT_CTLR_GET = "~ logout ~";
	public static final String SMARTQA_LOGOUT_CTLR_NO = "~ Params:No ~";

	public static final String SMARTQA_USER_AUTH_HANDLER = "~ UserAuthenticationSuccessHandler ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_ONAUTH = "~ onAuthenticationSuccess ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_ONAUTH_NO = "~ Params:No ~";

	public static final String SMARTQA_USER_AUTH_HANDLER_HANDLE = "~ handle ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_HANDLE_NO = "~ handle Params:No ~";

	public static final String SMARTQA_USER_AUTH_HANDLER_TAR_URL = "~ determineTargetUrl ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_TAR_URL_NO = "~ Params:No ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_TAR_URL_RETN = "~ Return ~";

	public static final String SMARTQA_USER_AUTH_HANDLER_CLR_AUTH = "~ clearAuthenticationAttributes ~";
	public static final String SMARTQA_USER_AUTH_HANDLER_CLR_AUTH_NO = "~ Params:No ~";

}
