package com.spring.config.security.expression;

import org.springframework.security.access.expression.SecurityExpressionRoot;
import org.springframework.security.access.expression.method.MethodSecurityExpressionOperations;
import org.springframework.security.core.Authentication;

import com.spring.domain.User;
import com.spring.domain.UserPrincipal;
import com.spring.service.PermissionCheck;

public class CustomMethodSecurityExpressionRoot extends SecurityExpressionRoot
		implements MethodSecurityExpressionOperations {

	private PermissionCheck permissionCheck;
	private Object filterObject;
	private Object returnObject;
	private Object target;

	public CustomMethodSecurityExpressionRoot(Authentication authentication) {
		super(authentication);
	}

	@Override
	public void setFilterObject(Object filterObject) {
		this.filterObject = filterObject;
	}

	@Override
	public Object getFilterObject() {
		return filterObject;
	}

	@Override
	public void setReturnObject(Object returnObject) {
		this.returnObject = returnObject;
	}

	@Override
	public Object getReturnObject() {
		return returnObject;
	}

	public void setPermissionCheck(PermissionCheck permissionCheck) {
		this.permissionCheck = permissionCheck;
	}

	@Override
	public Object getThis() {
		return target;
	}

	public boolean canEditCourse(String courseID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.isCourseAuthor(user.getUserID(), courseID);
	}

	public boolean isRegisteredCourse(String courseID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.isRegisteredCourse(user.getUserID(), courseID);
	}

	public boolean canEditComment(int commentID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.canEditComment(commentID, user.getUserID());
	}

	public boolean isAccountOwner(String userID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return userID.equals(user.getUserID());
	}


	public boolean IsCourseAuthorOrIsRegisteredCourse(String lessonID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.checkIsCourseAuthorOrIsRegisteredCourse(lessonID, user.getUserID());
	}

	public boolean isCourseAuthorByChapterID(String chapterID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.isCourseAuthorByChapterID(user.getUserID(), chapterID);
	}
	
	public boolean isCourseAuthorByLessonID(String lessonID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.isCourseAuthorByLessonID(lessonID, user.getUserID());
		
	}

	public boolean isRegisteredCourseFromLesson(String lessonID) {
		User user = ((UserPrincipal) this.getPrincipal()).getUser();
		return this.permissionCheck.isRegisteredCourseFromLesson(user.getUserID(), lessonID);
	}


}
