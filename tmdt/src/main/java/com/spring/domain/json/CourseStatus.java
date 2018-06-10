package com.spring.domain.json;

public class CourseStatus {
	private String courseID;
	private int newStatus;
	public CourseStatus(String courseID, int newStatus) {
		super();
		this.courseID = courseID;
		this.newStatus = newStatus;
	}
	public CourseStatus() {
		super();
	}
	public String getCourseID() {
		return courseID;
	}
	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}
	public int getNewStatus() {
		return newStatus;
	}
	public void setNewStatus(int newStatus) {
		this.newStatus = newStatus;
	}
	@Override
	public String toString() {
		return "CourseStatus [courseID=" + courseID + ", newStatus=" + newStatus + "]";
	}
	
	

}
