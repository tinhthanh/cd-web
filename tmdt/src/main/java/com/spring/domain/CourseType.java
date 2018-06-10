package com.spring.domain;

public class CourseType {
	private String courseTypeID;
	private String courseTypeTitle;
	private String courseDescription;
	public CourseType(String courseTypeID, String courseTypeTitle, String courseDescription) {
		super();
		this.courseTypeID = courseTypeID;
		this.courseTypeTitle = courseTypeTitle;
		this.courseDescription = courseDescription;
	}
	public CourseType() {
		super();
	}
	
	public String getCourseTypeID() {
		return courseTypeID;
	}
	public void setCourseTypeID(String courseTypeID) {
		this.courseTypeID = courseTypeID;
	}
	public String getCourseTypeTitle() {
		return courseTypeTitle;
	}
	public void setCourseTypeTitle(String courseTypeTitle) {
		this.courseTypeTitle = courseTypeTitle;
	}
	public String getCourseDescription() {
		return courseDescription;
	}
	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}
	@Override
	public String toString() {
		return "CourseType [courseTypeID=" + courseTypeID + ", courseTypeTitle=" + courseTypeTitle
				+ ", courseDescription=" + courseDescription + "]";
	}

	
}
