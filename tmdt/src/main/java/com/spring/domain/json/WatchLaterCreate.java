package com.spring.domain.json;

public class WatchLaterCreate {
	private String courseID;

	public WatchLaterCreate(String courseID) {
		super();
		this.courseID = courseID;
	}

	public WatchLaterCreate() {
		super();
	}

	public String getCourseID() {
		return courseID;
	}

	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}

	@Override
	public String toString() {
		return "WatchLaterCreate [courseID=" + courseID + "]";
	}
	

}
