package com.spring.service.imp;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.CourseRegister;
import com.spring.repository.CourseRegisterRepository;
import com.spring.service.CourseRegisterSerivce;

@Service
public class CourseRegisterServiceImp implements CourseRegisterSerivce {
	@Autowired
	private CourseRegisterRepository courseRegisterRepository;

	@Override
	public List<CourseRegister> getListCourseRegisterByCourseID(String courseID) {
		return this.courseRegisterRepository.getListCourseRegisterByCourseID(courseID);
	}

	@Override
	public Map<String, Object> getListCourseRegisterByUserID(int page, int size, String userID) {
		return this.courseRegisterRepository.getListCourseRegisterByUserID(page, size, userID);
	}

	@Override
	public Optional<CourseRegister> getCourseRegister(String userID, String courseID) {
		return this.courseRegisterRepository.getCourseRegister(userID, courseID);
	}

	@Override
	public int createCourseRegister(String courseID, String userID) {
		return this.courseRegisterRepository.createCourseRegister(courseID, userID);
	}

	@Override
	public int deleteRegisterByCourse(String courseID, String userID) {
		return 0;
	}

}
