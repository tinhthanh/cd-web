package com.spring.repository.imp;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.domain.Statistics;
import com.spring.repository.ReportRepository;
@Repository
public class ReportRepositoryImp implements ReportRepository{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ReportRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	
	@Override
	public Map<String, Object> statisticsByTopic(int rowsLimit) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("rowsLimit", rowsLimit);
			List<Statistics> listTopicResult = sqlSession.selectList("com.spring.mapper.TopicMapper.statisticsByTopic",
					param);
			int totalCourse = (int) param.get("totalCourse");
			result.put("listOfResult", listTopicResult);
			result.put("totalCourse", totalCourse);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> statisticsByGuest(int rowsLimit) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("rowsLimit", rowsLimit);
			List<Statistics> listTopicResult = sqlSession.selectList("com.spring.mapper.UserMapper.statisticsByGuest",
					param);
			int totalCourse = (int) param.get("totalCourse");
			result.put("listOfResult", listTopicResult);
			result.put("totalCourse", totalCourse);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> statisticsByCource(int rowsLimit) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("rowsLimit", rowsLimit);
			List<Statistics> listTopicResult = sqlSession.selectList("com.spring.mapper.CourseMapper.statisticsByCourse",
					param);
			int totalCourse = (int) param.get("totalCourse");
			result.put("listOfResult", listTopicResult);
			result.put("totalCourse", totalCourse);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

}
