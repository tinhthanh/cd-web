package com.spring.repository.imp;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.domain.CourseRegister;
import com.spring.repository.CourseRegisterRepository;

@Repository
public class CourseRegisterRepositoryImp implements CourseRegisterRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(CourseRegisterRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sessionFactory;

	@Override
	public List<CourseRegister> getListCourseRegisterByCourseID(String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		List<CourseRegister> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.CourseRegisterMapper.getListCourseRegisterByCourseID",
					courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> getListCourseRegisterByUserID(int page, int size, String userID) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		try {
			param.put("page", page);
			param.put("size", size);
			param.put("userID", userID);
			List<CourseRegister> listTopicResult = 
					session.selectList("com.spring.mapper.CourseRegisterMapper.getListCourseRegisterByUserID", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<CourseRegister> getCourseRegister(String userID, String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		CourseRegister courseRegister = new CourseRegister();
		Map<String, Object> param = new HashMap<>();
		param.put("courseID", courseID);
		param.put("userID", userID);
		try {
			courseRegister = session.selectOne("com.spring.mapper.CourseRegisterMapper.getCourseRegister", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(courseRegister);
	}

	@Override
	public int createCourseRegister(String courseID, String userID) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		int result = 0;
		param.put("courseID", courseID);
		param.put("userID", userID);
		try {
			result = session.insert("com.spring.mapper.CourseRegisterMapper.createCourseRegister", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

}
