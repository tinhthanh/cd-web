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

import com.spring.domain.WatchLater;
import com.spring.repository.WatchLaterRepository;

@Repository
public class WatchLaterRepositoryImp implements WatchLaterRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(WatchLaterRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sessionFactory;

	@Override
	public List<WatchLater> getWatchLaterByUserID(String userID) {

		SqlSession session = this.sessionFactory.openSession();
		List<WatchLater> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.WatchLaterMapper.getWatchLaterByUserID", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<WatchLater> getWatchLaterByUserIDAndCourseID(String userID, String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		WatchLater watchLater = new WatchLater();
		Map<String, Object> param = new HashMap<>();
		try {
			param.put("userID", userID);
			param.put("courseID", courseID);
			watchLater = session.selectOne("com.spring.mapper.WatchLaterMapper.getWatchLaterByUserIDAndCourseID",
					param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return Optional.ofNullable(watchLater);
	}

	@Override
	public int deleteWatchLater(String userID, String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		int result = 0;
		Map<String, Object> param = new HashMap<>();
		param.put("userID", userID);
		param.put("courseID", courseID);
		try {
			result = session.delete("com.spring.mapper.WatchLaterMapper.deleteWatchLater", param);

		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

	@Override
	public int insertWatchLater(String userID, String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		int result = 0;
		Map<String, Object> param = new HashMap<>();
		param.put("userID", userID);
		param.put("courseID", courseID);
		try {
			result = session.delete("com.spring.mapper.WatchLaterMapper.insertWatchLater", param);

		} catch (Exception e) {
			LOGGER.info(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

}
