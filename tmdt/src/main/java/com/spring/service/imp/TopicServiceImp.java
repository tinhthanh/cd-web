package com.spring.service.imp;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Topic;
import com.spring.repository.TopicRepository;
import com.spring.service.TopicService;

@Service
public class TopicServiceImp implements TopicService {
	@Autowired
	private TopicRepository topicRepository;

	@Override
	public Map<String, Object> getTopicWithPaging(int page, int size) {
		return this.topicRepository.getTopicWithPaging(page, size);
	}

	@Override
	public int updateTopicStatut(String topicID, int newStatut) {
		return this.topicRepository.updateTopicStatus(topicID, newStatut);
	}

	@Override
	public String createTopic(String topicTitle, String topicDescription, int topicStatus) {
		return this.topicRepository.createTopic(topicTitle, topicDescription, topicStatus);
	}

	@Override
	public int updateTopicWithTopicID(Topic topic) {
		return this.topicRepository.updateTopicWithTopicID(topic);
	}

	@Override
	public Optional<Topic> getTopicByID(String topicID) {
		return this.topicRepository.getTopicByID(topicID);
	}

	@Override
	public Map<String, Object> searchTopicWithTopicName(int page, int size, String searchKey) {
		return this.topicRepository.searchTopicWithTopicName(page, size, searchKey);
	}

	@Override
	public Map<String, Object> getAllTopicAdmin(int page, int size) {
		return this.topicRepository.getAllTopicAdmin(page, size);
	}

}
