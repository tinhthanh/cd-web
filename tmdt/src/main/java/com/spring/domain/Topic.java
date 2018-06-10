package com.spring.domain;

public class Topic {
	private String topicID;
	private String topicName;
	private	String topicDescription;
	private Integer topicStatus;
	public Topic(String topicID, String topicName, String topicDescription, Integer topicStatus) {
		super();
		this.topicID = topicID;
		this.topicName = topicName;
		this.topicDescription = topicDescription;
		this.topicStatus = topicStatus;
	}
	public Topic() {
		super();
	}
	public String getTopicID() {
		return topicID;
	}
	public void setTopicID(String topicID) {
		this.topicID = topicID;
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
		return "Topic [topicID=" + topicID + ", topicName=" + topicName + ", topicDescription=" + topicDescription
				+ ", topicStatus=" + topicStatus + "]";
	}
	
	
}
