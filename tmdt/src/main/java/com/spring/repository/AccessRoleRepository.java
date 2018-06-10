package com.spring.repository;

public interface AccessRoleRepository {
	
	public int addUserRole(String userID);
	
	public int removeUserRole(String userID);
}
