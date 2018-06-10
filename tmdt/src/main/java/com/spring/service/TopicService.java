package com.spring.service;

import java.util.Map;
import java.util.Optional;

import com.spring.domain.Topic;

public interface TopicService {
	/**
	 * get topic with paging parameter 
	 * @param page current page begin with 1
	 * @param size number of record per page
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object> getTopicWithPaging(int page,int size);
	
	/**
	 * update topic status
	 * @param topicID topic id
	 * @param newStatut new status
	 * @return number of row effect
	 * 0: clock 1:active
	 */
	public int updateTopicStatut(String topicID,int newStatut);
	
	/**
	 * create topic
	 * @param topicTitle
	 * @param topicDescription
	 * @param topicStatus
	 * @return number of row effect
	 */
	public String createTopic(String topicTitle, String topicDescription, int topicStatus);
	
	/**
	 * update topic with topicID
	 * @param topic
	 * if attribute of topic is null, system only update attribute != null
	 * @return number of row effect
	 */
	public int updateTopicWithTopicID(Topic topic);
	
	/**
	 * get topic by topic ID
	 * @param topicID
	 * @return optional<Topic>
	 */
	public Optional<Topic>getTopicByID(String topicID);
	/**
	 * search topic name  
	 * @param page number of page (start at 1)
	 * @param size
	 * @param searchKey (String search)
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object>searchTopicWithTopicName(int page, int size,String searchKey);
	
	/**
	 * get topic with paging parameter 
	 * @param page current page begin with 1
	 * @param size number of record per page
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object>getAllTopicAdmin(int page,int size);

}
