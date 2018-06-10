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
import com.spring.repository.StatisticsRepository;

@Repository
public class StatisticsRepositoryImp implements StatisticsRepository{
	private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsRepositoryImp.class);
	@Autowired
	SqlSessionFactory sessionFactory;
	
	@Override
	public Map<String, Object> statisticsByTopic(int rowsLimit) {
		SqlSession sqlSession = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		try {
			param.put("rowsLimit", rowsLimit);
			List<Statistics> listOfResult = sqlSession.selectList("com.spring.mapper.TopicMapper.statisticsByTopic", param);
			int totalCourse = (int) param.get("totalCourse");
			result.put("totalCourse", totalCourse);
			result.put("listOfResult", listOfResult);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> statisticsByCourse(int rowsLimit) {
		SqlSession sqlSession = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		try {
			param.put("rowsLimit", rowsLimit);
			List<Statistics> listOfResult = sqlSession.selectList("com.spring.mapper.CourseMapper.statisticsByCourse", param);
			int totalView = (int) param.get("totalView");
			result.put("totalView", totalView);
			result.put("listOfResult", listOfResult);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}finally {
			sqlSession.close();
		}
		return result;
	}

}
