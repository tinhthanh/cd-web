package com.spring.service.imp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.repository.AccessRoleRepository;
import com.spring.service.AccessRoleService;

@Service
public class AccessRoleServiceImp implements AccessRoleService{
	@Autowired
	private AccessRoleRepository accessRoleRepository;
	
	@Override
	public int addUserRole(String userID) {
		return this.accessRoleRepository.addUserRole(userID);
	}

	@Override
	public int removeUserRole(String userID) {
		return this.accessRoleRepository.removeUserRole(userID);
	}

}
