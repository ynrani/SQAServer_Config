package com.smartqaserver.model.DO;

import java.io.Serializable;
import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 * The persistent class for the PROPERTY_FILE_CHANGE_LOG database table.
 * 
 */
@Entity
@Table(name = "PROPERTY_FILE_CHANGE_LOG")
@NamedQuery(name = "ServerPropertyFileChangeLogDO.findAll", query = "SELECT r FROM ServerPropertyFileChangeLogDO r")
public class ServerPropertyFileChangeLogDO implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private String Id;

	@Column(name = "PROPERTY_FILE_NAME")
	private String propertyFileName;

	@Column(name = "ACTION_BY")
	private String actionBy;

	@Column(name = "ACTION_DT")
	private Timestamp actionDt;

	public ServerPropertyFileChangeLogDO() {
		super();
	}

	public ServerPropertyFileChangeLogDO(String id, String propertyFileName, String actionBy, Timestamp actionDt) {
		super();
		Id = id;
		this.propertyFileName = propertyFileName;
		this.actionBy = actionBy;
		this.actionDt = actionDt;
	}

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getPropertyFileName() {
		return propertyFileName;
	}

	public void setPropertyFileName(String propertyFileName) {
		this.propertyFileName = propertyFileName;
	}

	public String getActionBy() {
		return actionBy;
	}

	public void setActionBy(String actionBy) {
		this.actionBy = actionBy;
	}

	public Timestamp getActionDt() {
		return actionDt;
	}

	public void setActionDt(Timestamp actionDt) {
		this.actionDt = actionDt;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

}