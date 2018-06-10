package com.spring.repository;

import java.util.List;

import com.spring.domain.Role;

public interface RoleRepository {
	public List<Role>getListRoleByUserID(String userID);
}
