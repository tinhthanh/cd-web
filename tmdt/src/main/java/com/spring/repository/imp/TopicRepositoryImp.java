package com.spring.repository.imp;

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

import com.spring.domain.Topic;
import com.spring.repository.TopicRepository;

@Repository
public class TopicRepositoryImp implements TopicRepository {
	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	private static final Logger LOGGER = LoggerFactory.getLogger(TopicRepositoryImp.class);

	@Override
	public String createTopic(String topicName, String topicDescription, int topicStatut) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		String result =null;
		param.put("topicTitle", topicName);
		param.put("topicDescription", topicDescription);
		param.put("topicStatus", topicStatut);
		param.put("result", result);
		try {
			sqlSession.insert("com.spring.mapper.TopicMapper.createTopic", param);
			result = (String)param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> getTopicWithPaging(int page, int size) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			List<Topic> listTopicResult = sqlSession.selectList("com.spring.mapper.TopicMapper.getTopicWithPaging",
					param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord =(int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public int updateTopicStatus(String topicID, int newStatus) {
		Map<String, Object> param = new HashMap<>();
		param.put("topicID", topicID);
		param.put("newStatus", newStatus);
		SqlSession session = sqlSessionFactory.openSession();
		int numberOfRowUpdate = 0;
		try {
			numberOfRowUpdate = session.update("com.spring.mapper.TopicMapper.updateTopicStatus", param);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return numberOfRowUpdate;
	}

	@Override
	public int updateTopicWithTopicID(Topic topic) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("topicID", topic.getTopicID());
		param.put("topicName", topic.getTopicName());
		param.put("topicDescription", topic.getTopicDescription());
		param.put("topicStatus", topic.getTopicStatus());
		int numberOfRowUpdate = 0;
		try {
			numberOfRowUpdate = session.update("com.spring.mapper.TopicMapper.updateTopicWithTopicID", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return numberOfRowUpdate;
	}

	@Override
	public Optional<Topic> getTopicByID(String topicID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Topic result = new Topic();
		try {
			result = session.selectOne("com.spring.mapper.TopicMapper.getTopicByTopicID", topicID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(result);
	}

	@Override
	public Map<String, Object> searchTopicWithTopicName(int page, int size, String topicNameSearch) {

		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		try {

			param.put("page", page);
			param.put("size", size);
			param.put("sumPage", 0);
			param.put("topicNameSearch", topicNameSearch);
			List<Topic> listTopicResult = session.selectList("com.spring.mapper.TopicMapper.searchTopicWithTopicName",
					param);

			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord =(int) param.get("sumRecord");
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
	public Map<String, Object> getAllTopicAdmin(int page, int size) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			List<Topic> listTopicResult = sqlSession.selectList("com.spring.mapper.TopicMapper.getAllTopicAdmin",
					param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord =(int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}
}
