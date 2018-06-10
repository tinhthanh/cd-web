package com.spring.domain.json;

public class CourseUpdate {
	private String courseID;
	private String courseTitle;
	private String courseDescription;
	private int price;
	private String courseTypeID;
	private String topicID;
	private Integer status;
	private String courseAvatar;
	private String courseDetail;
	public CourseUpdate(String courseID, String courseTitle, String courseDescription, int price, String courseTypeID,
			String topicID, Integer status, String courseAvatar, String courseDetail) {
		super();
		this.courseID = courseID;
		this.courseTitle = courseTitle;
		this.courseDescription = courseDescription;
		this.price = price;
		this.courseTypeID = courseTypeID;
		this.topicID = topicID;
		this.status = status;
		this.courseAvatar = courseAvatar;
		this.courseDetail = courseDetail;
	}
	public CourseUpdate() {
		super();
	}
	
	
	public String getCourseID() {
		return courseID;
	}
	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}
	public String getCourseTitle() {
		return courseTitle;
	}
	public void setCourseTitle(String courseTitle) {
		this.courseTitle = courseTitle;
	}
	public String getCourseDescription() {
		return courseDescription;
	}
	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getCourseTypeID() {
		return courseTypeID;
	}
	public void setCourseTypeID(String courseTypeID) {
		this.courseTypeID = courseTypeID;
	}
	public String getTopicID() {
		return topicID;
	}
	public void setTopicID(String topicID) {
		this.topicID = topicID;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getCourseAvatar() {
		return courseAvatar;
	}
	public void setCourseAvatar(String courseAvatar) {
		this.courseAvatar = courseAvatar;
	}
	public String getCourseDetail() {
		return courseDetail;
	}
	public void setCourseDetail(String courseDetail) {
		this.courseDetail = courseDetail;
	}
	@Override
	public String toString() {
		return "CourseUpdate [courseID=" + courseID + ", courseTitle=" + courseTitle + ", courseDescription="
				+ courseDescription + ", price=" + price + ", courseTypeID=" + courseTypeID + ", topicID=" + topicID
				+ ", status=" + status + ", courseAvatar=" + courseAvatar + ", courseDetail=" + courseDetail + "]";
	}
	
	
	

}
