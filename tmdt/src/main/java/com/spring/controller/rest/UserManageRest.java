package com.spring.controller.rest;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.domain.User;
import com.spring.domain.custom.UserInfo;
import com.spring.domain.json.RoleDeleting;
import com.spring.domain.json.UserInfoUpdate;
import com.spring.service.AccessRoleService;
import com.spring.service.UserService;

@RestController
public class UserManageRest {
	@Autowired
	private UserService userService;
	@Autowired
	private AccessRoleService accessRoleService;

	@RequestMapping(value = "/admin/user_info", method = RequestMethod.GET, params = { "page", "size" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getUserInfo(@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.userService.getListUserInfo(page, size);
		if (result.isEmpty()) {
			return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/admin/user_info", method = RequestMethod.PATCH)
	@PreAuthorize("hasRole('ROLE_ADMIN')||isAccountOwner(#infoUpdate.userID)")
	public ResponseEntity<?> updateUserInfo(@RequestBody UserInfoUpdate infoUpdate) {
		User user = this.userService.getUserByUserID(infoUpdate.getUserID());
		if (user == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int resultOfUpdate = this.userService.updateUserInfo(infoUpdate.getUserName(), infoUpdate.getAvatar(),
				infoUpdate.getAddress(), infoUpdate.getPhoneNumber(), infoUpdate.getUserID());
		long numberOfFieldNotNull = infoUpdate.getNonNullFieldCount();
		if (resultOfUpdate < numberOfFieldNotNull - 1) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "user info update failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<UserInfo> info = this.userService.getUserInfo(infoUpdate.getUserID());
		return new ResponseEntity<Object>(info.get(), HttpStatus.OK);
	}
	
	@RequestMapping(value = "/admin/access_role", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> addUserRole(@RequestBody RoleDeleting roleDel) {
		User user = this.userService.getUserByUserID(roleDel.getUserID());
		if (user == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int rowInserted = this.accessRoleService.addUserRole(roleDel.getUserID());
		if (rowInserted == 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "This user already have this role");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(rowInserted, HttpStatus.OK);
		
	}
	
	@RequestMapping(value = "/admin/access_role", method = RequestMethod.DELETE)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeUserRole(@RequestParam(value = "userID", required = true) String userID) {
		User user = this.userService.getUserByUserID(userID);
		if (user == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int rowInserted = this.accessRoleService.removeUserRole(userID);
		if (rowInserted == 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "This user didn't have this role");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(rowInserted, HttpStatus.OK);
		
	}
}
