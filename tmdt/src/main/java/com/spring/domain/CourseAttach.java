package com.spring.domain;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.domain.custom.UserInfo;

public class CourseAttach {
	private String courseID;
	private String courseTitle;
	private String courseDescription;
	private UserInfo author;
	private LocalDateTime createDate;
	private Integer price;
	private CourseType courseType;
	private Topic topic;
	private UserInfo confirmedBy;
	private Integer status;
	private LocalDateTime confirmedDate;
	private Integer views;
	private String courseAvatar;
	private String courseDetail;
	private List<Chapter> listChapter;

	public CourseAttach(String courseID, String courseTitle, String courseDescription, UserInfo author,
			LocalDateTime createDate, Integer price, CourseType courseType, Topic topic, UserInfo confirmedBy,
			Integer status, LocalDateTime confirmedDate, Integer views, String courseAvatar, String courseDetail,
			List<Chapter> listChapter) {
		super();
		this.courseID = courseID;
		this.courseTitle = courseTitle;
		this.courseDescription = courseDescription;
		this.author = author;
		this.createDate = createDate;
		this.price = price;
		this.courseType = courseType;
		this.topic = topic;
		this.confirmedBy = confirmedBy;
		this.status = status;
		this.confirmedDate = confirmedDate;
		this.views = views;
		this.courseAvatar = courseAvatar;
		this.courseDetail = courseDetail;
		this.listChapter = listChapter;
	}

	public CourseAttach() {
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

	public UserInfo getAuthor() {
		return author;
	}

	public void setAuthor(UserInfo author) {
		this.author = author;
	}

	public LocalDateTime getCreateDate() {
		return createDate;
	}

	public void setCreateDate(LocalDateTime createDate) {
		this.createDate = createDate;
	}

	public Integer getPrice() {
		return price;
	}

	public void setPrice(Integer price) {
		this.price = price;
	}

	public CourseType getCourseType() {
		return courseType;
	}

	public void setCourseType(CourseType courseType) {
		this.courseType = courseType;
	}

	public Topic getTopic() {
		return topic;
	}

	public void setTopic(Topic topic) {
		this.topic = topic;
	}

	public UserInfo getConfirmedBy() {
		return confirmedBy;
	}

	public void setConfirmedBy(UserInfo confirmedBy) {
		this.confirmedBy = confirmedBy;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public LocalDateTime getConfirmedDate() {
		return confirmedDate;
	}

	public void setConfirmedDate(LocalDateTime confirmedDate) {
		this.confirmedDate = confirmedDate;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
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

	public List<Chapter> getListChapter() {
		return listChapter;
	}

	public void setListChapter(List<Chapter> listChapter) {
		this.listChapter = listChapter;
	}

	@Override
	public String toString() {
		return "CourseAttach [courseID=" + courseID + ", courseTitle=" + courseTitle + ", courseDescription="
				+ courseDescription + ", author=" + author + ", createDate=" + createDate + ", price=" + price
				+ ", courseType=" + courseType + ", topic=" + topic + ", confirmedBy=" + confirmedBy + ", status="
				+ status + ", confirmedDate=" + confirmedDate + ", views=" + views + ", courseAvatar=" + courseAvatar
				+ ", courseDetail=" + courseDetail + ", listChapter=" + listChapter + "]";
	}

}
