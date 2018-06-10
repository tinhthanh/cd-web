package com.spring.domain.json;

public class CourseRegisterInfo {
	private String courseID;

	public CourseRegisterInfo(String courseID) {
		super();
		this.courseID = courseID;
	}

	public CourseRegisterInfo() {
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
		return "CourseRegisterInfo [courseID=" + courseID + "]";
	}
	

}
