package com.spring.domain.json;

public class TopicCreation {
	private String topicName;
	private	String topicDescription;
	private Integer topicStatus;
	public TopicCreation(String topicName, String topicDescription, Integer topicStatus) {
		super();
		this.topicName = topicName;
		this.topicDescription = topicDescription;
		this.topicStatus = topicStatus;
	}
	public TopicCreation() {
		super();
	}
	public String getTopicName() {
		return topicName;
	}
	public void setTopicName(String topicName) {
		this.topicName = topicName;
	}
	public String getTopicDescription() {
		return topicDescription;
	}
	public void setTopicDescription(String topicDescription) {
		this.topicDescription = topicDescription;
	}
	public Integer getTopicStatus() {
		return topicStatus;
	}
	public void setTopicStatus(Integer topicStatus) {
		this.topicStatus = topicStatus;
	}
	@Override
	public String toString() {
		return "TopicCreation [topicName=" + topicName + ", topicDescription=" + topicDescription + ", topicStatus="
				+ topicStatus + "]";
	}
	
}
