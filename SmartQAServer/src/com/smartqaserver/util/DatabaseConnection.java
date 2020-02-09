package com.smartqaserver.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

import org.apache.log4j.Logger;

public class DatabaseConnection {

	private static final Logger LOGGER = Logger.getLogger(DatabaseConnection.class);
	
	
	private static Connection conn;
	private static String myDriver;
	private static String myUrl;
	private static String uname;
	private static String psw;
	

	private DatabaseConnection() {

	}

	public static Connection getConnection() {

		if (conn == null) {
			synchronized (DatabaseConnection.class) {
					try {
						Class.forName(myDriver);
						conn = DriverManager.getConnection(myUrl, uname, psw);
					} catch (Exception e1) {
						LOGGER.error(e1.getMessage());
					}

			}
		}
		return conn;

	}

	public static void closeConnection() {

		try {
			if (conn != null) {
				conn.close();
				conn = null;

			}
		} catch (Exception e1) {
			LOGGER.error(e1.getMessage());
		}

	}

	static {
		InputStream is = null;
		Properties prop = null;
		try {
			prop = new Properties();
			is = DatabaseConnection.class.getClassLoader().getResourceAsStream(
					"properties/DBProperties.properties");

			prop.load(is);
			myDriver = prop.getProperty("db.driver");
			myUrl = prop.getProperty("db.url");
			uname = prop.getProperty("db.user");
			psw = prop.getProperty("db.pass");

		} catch (IOException e) {
			LOGGER.error(e.getMessage());
		}

	}
}
