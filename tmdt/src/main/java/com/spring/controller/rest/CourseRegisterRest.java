package com.spring.controller.rest;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.User;
import com.spring.service.CourseRegisterSerivce;
import com.spring.service.UserService;

@RestController
public class CourseRegisterRest {
	@Autowired
	private CourseRegisterSerivce courseRegisterSerivce;
	@Autowired
	private UserService userService;
	@Autowired
	JwtTokenUtil tokenUtil;

	@RequestMapping(value = "/user/course/register",method=RequestMethod.GET, params = { "page", "size" })
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getListCourseRegisterByUserID(HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		String authToken = tokenUtil.getToken(request);
		User user = userService.getUserByEmail(tokenUtil.getUsernameFromToken(authToken));
		if (user == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Map<String, Object> listCourseRegister = this.courseRegisterSerivce
				.getListCourseRegisterByUserID(page, size, user.getUserID());
		return new ResponseEntity<Object>(listCourseRegister, HttpStatus.OK);

	}
}
