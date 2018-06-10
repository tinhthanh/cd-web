package com.spring.domain.json;

public class CourseCreate {
	private String courseTitle;
	private String courseDescription;
	private Integer price;
	private String courseTypeID;
	private String topicID;
	private String courseAvatar;
	private String courseDetail;

	public CourseCreate(String courseTitle, String courseDescription,Integer price, String courseTypeID,
			String topicID, String courseAvatar, String courseDetail) {
		super();
		this.courseTitle = courseTitle;
		this.courseDescription = courseDescription;
		this.price = price;
		this.courseTypeID = courseTypeID;
		this.topicID = topicID;
		this.courseAvatar = courseAvatar;
		this.courseDetail = courseDetail;
	}

	public CourseCreate() {
		super();
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

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
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
		return "CourseCreate [courseTitle=" + courseTitle + ", courseDescription=" + courseDescription + ", price="
				+ price + ", courseTypeID=" + courseTypeID + ", topicID=" + topicID + ", courseAvatar=" + courseAvatar
				+ ", courseDetail=" + courseDetail + "]";
	}

	

}
