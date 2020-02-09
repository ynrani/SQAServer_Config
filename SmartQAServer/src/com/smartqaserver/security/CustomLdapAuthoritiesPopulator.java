package com.smartqaserver.security;

import java.sql.SQLException;
import java.util.Collection;
import java.util.HashSet;
import java.util.StringTokenizer;
import org.apache.commons.lang.StringUtils;
import org.springframework.ldap.core.DirContextOperations;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.ldap.userdetails.LdapAuthoritiesPopulator;
import org.springframework.stereotype.Component;
import com.smartqaserver.constant.SmartQAConstants;
import com.smartqaserver.util.JDBCPreparedStatementSelect;

@Component
public class CustomLdapAuthoritiesPopulator implements LdapAuthoritiesPopulator
{
	JDBCPreparedStatementSelect jd = null;

	@Override
	public Collection<? extends GrantedAuthority> getGrantedAuthorities(DirContextOperations userData, String username) {
		String role = "", username_and_role = "";
		jd = new JDBCPreparedStatementSelect();
		try {
			username_and_role = jd.selectRecordsFromTable(username);
			if (StringUtils.isNotEmpty(username_and_role)) {
				StringTokenizer st = new StringTokenizer(username_and_role, "-");
				while (st.hasMoreTokens()) {
					username = st.nextToken();
					role = st.nextToken();
					//jd.updateLoginCount(username);
				}
			} else {
				role = jd.insertNewUser(username);
			}
		} catch (SQLException e1) {
		}

		Collection<GrantedAuthority> gas = new HashSet<GrantedAuthority>();

		if (StringUtils.isNotEmpty(role) && role.equals(SmartQAConstants.ROLE_USER)) {
			gas.add(new SimpleGrantedAuthority(SmartQAConstants.ROLE_USER));
		} else if (StringUtils.isNotEmpty(role) && role.equals(SmartQAConstants.ROLE_ADMIN)) {
			gas.add(new SimpleGrantedAuthority(SmartQAConstants.ROLE_ADMIN));
		} else if (StringUtils.isNotEmpty(role) && role.equals(SmartQAConstants.ROLE_ENV_OWNR)) {
			gas.add(new SimpleGrantedAuthority(SmartQAConstants.ROLE_ENV_OWNR));
		} else if (StringUtils.isNotEmpty(role) && role.equals(SmartQAConstants.ROLE_SUPER_ADMIN)) {
			gas.add(new SimpleGrantedAuthority(SmartQAConstants.ROLE_SUPER_ADMIN));
		} else {
			gas.add(new SimpleGrantedAuthority(SmartQAConstants.ROLE_INVALID));
		}

		return gas;
	}
}
