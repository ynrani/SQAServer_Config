package com.smartqaserver.util;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.InetAddress;
import java.sql.Timestamp;
import java.util.Date;

public class UserLogFile {

	public static void main(String args[]) throws IOException {
		

	}

	public void userLogEntry() throws IOException {

		FileWriter fw = null;
		BufferedWriter bw = null;
		PrintWriter pw = null;

		String userName = System.getProperty("user.name");
		Date date = new Date();
		long time = date.getTime();
		Timestamp ts = new Timestamp(time);

		InetAddress inetAddress = InetAddress.getLocalHost();

		try {
			fw = new FileWriter("C:\\COE\\UserLoginDetails.txt", true);
			bw = new BufferedWriter(fw);
			pw = new PrintWriter(bw);

			pw.println("IP Address:- " + inetAddress.getHostAddress()
					+ "  ---  Host Name:- " + inetAddress.getHostName()
					+ "  ---  User Name: " + userName
					+ "  ---  Login Timestamp: " + ts);

			System.out
					.println("User Login details added Successfully appended into file");
			pw.flush();

		} finally {
			try {
				pw.close();
				bw.close();
				fw.close();
			} catch (IOException io) {
			}
		}

	}
}
