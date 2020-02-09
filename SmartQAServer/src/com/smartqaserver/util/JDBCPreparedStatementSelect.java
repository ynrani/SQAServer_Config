package com.smartqaserver.util;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;

import org.apache.log4j.Logger;

public class JDBCPreparedStatementSelect {
	
	private static final Logger LOGGER = Logger.getLogger(JDBCPreparedStatementSelect.class);

	public String selectRecordsFromTable(String userId) throws SQLException {

		String userrole = "", usermnameandrole = "";
		ResultSet rs = null;
		String selectSQL = "SELECT USER_ID,USER_TYPE,USER_NAME FROM REMS_USER_DTL WHERE USER_ID =?";
		Connection conn = DatabaseConnection.getConnection();
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL)) {
			
			preparedStatement.setString(1, userId);
			rs = preparedStatement.executeQuery();

			while (rs.next()) {

				String username = rs.getString("USER_ID");
				userrole = rs.getString("USER_TYPE");
				usermnameandrole = username + "-" + userrole;

				return usermnameandrole;
			}

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}
		finally{
			
			if(null!=rs){
				rs.close();
			}
		}

		return usermnameandrole;

	}

	public String insertNewUser(String userId) throws SQLException {

		String selectSQL = new String(
				"INSERT REMS_USER_DTL (USER_ID,USER_NAME,USER_TYPE,USER_ACCESS,ACTION_BY,ACTION_DT,ENABLED,USER_EMAIL,USER_PH,LOGIN_COUNT,BLOCKED_USER,LOGIN_TIMESTAMP) VALUES (?,?,'ROLE_USER','R',?,CURDATE(),1,?,'9000550909','1','NO',NOW())");
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL)) {
			
			preparedStatement.setString(1, userId);
			preparedStatement.setString(2, userId);
			preparedStatement.setString(3, userId);
			preparedStatement.setString(4, userId+"@capgemini.com");
	 
			preparedStatement.executeUpdate();

			return "ROLE_USER";

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}

		return "";

	}
	
	public void insertUserLoginDetails(String userId, int loginCount) throws SQLException {
		
		int id = getMaxUserLoginDetailsID();
		id++;
		
		String selectSQL = new String("INSERT USER_LOGIN_COUNT_DETAILS (ID,USER_ID,LOGIN_COUNT,LOGIN_TIMESTAMP) VALUES (?,?,?,?)");
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL)){
			
			Timestamp timestamp = new Timestamp(System.currentTimeMillis());
			
			preparedStatement.setInt(1, id);
			preparedStatement.setString(2, userId);
			preparedStatement.setInt(3, loginCount);
			preparedStatement.setTimestamp(4, timestamp);
			
			
			
			// execute select SQL statement
			preparedStatement.executeUpdate();


		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}

	}
	
	
	public void updateUserLogoutDetails(String userId, int loginCount) throws SQLException {
		
		
		String updateSQL = "UPDATE USER_LOGIN_COUNT_DETAILS SET LOGOUT_TIMESTAMP = NOW() WHERE USER_ID=? AND LOGIN_COUNT=?";
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(updateSQL+"")) {
			
			preparedStatement.setString(1, userId);
			preparedStatement.setInt(2, loginCount);
			// execute select SQL statement
			preparedStatement.executeUpdate();
			
			updateLogoutTimeRemsUser(userId);

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}

	}
	
	public void updateLoginCount(String userId) throws SQLException {

		int loginCount = getLoginCount(userId);
		
		//Method to check and update the logout time if session haas expired without logging out manually.
		updateLogoutDetailsCheck(userId, loginCount);
		
		//Incrementing Login Count
		loginCount =  loginCount + 1;
		
		insertUserLoginDetails(userId, loginCount);
		
		String selectSQL = "UPDATE REMS_USER_DTL SET LOGIN_COUNT = ? , LOGIN_TIMESTAMP = NOW() , LOGOUT_TIMESTAMP = "+null+" WHERE USER_ID=?";
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL+"")) {
			
			preparedStatement.setInt(1, loginCount);
			preparedStatement.setString(2, userId);
			// execute select SQL statement
			preparedStatement.executeUpdate();


		} catch (SQLException e) {

			System.out.println(e.getMessage());

		}

	}
	
	
	public void updateLogoutTimeRemsUser(String userId) throws SQLException {

		String selectSQL = "UPDATE REMS_USER_DTL SET LOGOUT_TIMESTAMP = NOW() WHERE USER_ID=?";
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL+"")){
			preparedStatement.setString(1, userId);
			// execute select SQL statement
			preparedStatement.executeUpdate();

		} catch (SQLException e) {

			e.getMessage();

		}

	}
	
	public void updateLogoutDetailsCheck(String userId, int loginCount) throws SQLException {

		Date logoutTimeStamp = null;
		
		String updateSQL = "UPDATE USER_LOGIN_COUNT_DETAILS SET LOGOUT_TIMESTAMP = NOW() WHERE USER_ID=? AND LOGIN_COUNT=?";
		
		String selectSQL1 = "SELECT LOGOUT_TIMESTAMP FROM USER_LOGIN_COUNT_DETAILS WHERE USER_ID =? AND LOGIN_COUNT=?";
		Connection conn = DatabaseConnection.getConnection();
		ResultSet rs1 = null;
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL1);
				PreparedStatement preparedStatement1 = conn.prepareStatement(updateSQL);
				) {
				
				preparedStatement.setString(1, userId);
				preparedStatement.setInt(2, loginCount);
				preparedStatement1.setString(1, userId);
				preparedStatement1.setInt(2, loginCount);
				
				rs1 = preparedStatement.executeQuery();
			
				while (rs1.next()) {

					logoutTimeStamp = rs1.getDate("LOGOUT_TIMESTAMP");

				}
				if(null==logoutTimeStamp){
					updateLogoutTimeRemsUser(userId);
					preparedStatement1.executeUpdate();
				}			


		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}
		finally
		{
			if(rs1!=null)
			{
				rs1.close();
			}
		}

	}
	
	
	public int getLoginCount(String userId) throws SQLException {

		int loginCount = 1;

		String selectSQL = "SELECT LOGIN_COUNT FROM REMS_USER_DTL WHERE USER_ID =?";
		Connection conn = DatabaseConnection.getConnection();
		ResultSet rs = null;
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL);
				) {
			preparedStatement.setString(1, userId);
			rs = preparedStatement.executeQuery();
			while (rs.next()) {

				loginCount = rs.getInt("LOGIN_COUNT");

				return loginCount;
			}

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}
		finally
		{
			if(null!=rs)
			{
				rs.close();
			}
		}

		return loginCount;

	}
	
	
	
	public int getMaxUserLoginDetailsID() throws SQLException {

		int id = 0;

		String selectSQL = "SELECT MAX(ID) FROM USER_LOGIN_COUNT_DETAILS";
		Connection conn = DatabaseConnection.getConnection();
		
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL);
				ResultSet rs = preparedStatement.executeQuery()) {

			while (rs.next()) {

				id = rs.getInt(1);

				return id;
			}

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}

		return id;

	}
	
	
	
	public String getBlockedUserData(String userId) throws SQLException{

		String blockedUser = "";

		String selectSQL = "SELECT BLOCKED_USER FROM REMS_USER_DTL WHERE USER_ID =?";
		Connection conn = DatabaseConnection.getConnection();
		ResultSet rs = null;
		try(PreparedStatement preparedStatement = conn.prepareStatement(selectSQL);
				) {
			preparedStatement.setString(1, userId);
			rs = preparedStatement.executeQuery();
			while (rs.next()) {

				blockedUser = rs.getString("BLOCKED_USER");

				return blockedUser;
			}

		} catch (SQLException e) {

			LOGGER.error(e.getMessage());

		}
		finally
		{
			if(null!=rs)
			{
				rs.close();
			}
		}

		return blockedUser;
		
	}
	
}
