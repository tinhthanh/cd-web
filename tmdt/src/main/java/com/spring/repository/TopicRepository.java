package com.spring.repository;

import java.util.Map;
import java.util.Optional;

import com.spring.domain.Topic;

public interface TopicRepository {

	public String createTopic(String topicName, String topicDescription, int topicStatut);

	public Map<String, Object> getTopicWithPaging(int page, int size);

	public Optional<Topic> getTopicByID(String topicID);

	public int updateTopicStatus(String topicID, int newStatut);

	public int updateTopicWithTopicID(Topic topic);
	
	public Map<String, Object>searchTopicWithTopicName(int page, int size,String searchKey);
	
	public Map<String, Object>getAllTopicAdmin(int page,int size);
}
