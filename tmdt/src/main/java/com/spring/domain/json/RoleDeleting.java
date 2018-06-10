package com.spring.domain.json;

public class RoleDeleting {
	private String userID;

	public RoleDeleting() {
		super();
	}

	public RoleDeleting(String userID) {
		super();
		this.userID = userID;
	}

	public String getUserID() {
		return userID;
	}

	@Override
	public String toString() {
		return "RoleDelete [userID=" + userID + "]";
	}
	
}
