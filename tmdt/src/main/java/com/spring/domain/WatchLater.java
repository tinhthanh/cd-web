package com.spring.domain;

public class WatchLater {
	private String userID;
	private Course course;
	public WatchLater(String userID, Course course) {
		super();
		this.userID = userID;
		this.course = course;
	}
	public WatchLater() {
		super();
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public Course getCourse() {
		return course;
	}
	public void setCourse(Course course) {
		this.course = course;
	}
	@Override
	public String toString() {
		return "WatchLater [userID=" + userID + ", course=" + course + "]";
	}
	
	
}
