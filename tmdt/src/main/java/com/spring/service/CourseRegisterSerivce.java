package com.spring.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.CourseRegister;

public interface CourseRegisterSerivce {
	public List<CourseRegister> getListCourseRegisterByCourseID(String courseID);

	public Map<String, Object> getListCourseRegisterByUserID(int page, int size, String userID);

	public Optional<CourseRegister> getCourseRegister(String userID, String courseID);

	public int createCourseRegister(String courseID, String userID);

	public int deleteRegisterByCourse(String courseID, String userID);
}
