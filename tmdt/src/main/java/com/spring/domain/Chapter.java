package com.spring.domain;

import java.util.List;

public class Chapter {
	private String chapterID;
	private String courseID;
	private String chapterTitle;
	private String chapterContent;
	private String chapterSummary;
	private List<Lesson> listOfLesson;
	public Chapter(String chapterID, String courseID, String chapterTitle, String chapterContent, String chapterSummary,
			List<Lesson> listOfLesson) {
		super();
		this.chapterID = chapterID;
		this.courseID = courseID;
		this.chapterTitle = chapterTitle;
		this.chapterContent = chapterContent;
		this.chapterSummary = chapterSummary;
		this.listOfLesson = listOfLesson;
	}
	public Chapter() {
		super();
	}
	public String getChapterID() {
		return chapterID;
	}
	public void setChapterID(String chapterID) {
		this.chapterID = chapterID;
	}
	public String getCourseID() {
		return courseID;
	}
	public void setCourseID(String courseID) {
		this.courseID = courseID;
	}
	public String getChapterTitle() {
		return chapterTitle;
	}
	public void setChapterTitle(String chapterTitle) {
		this.chapterTitle = chapterTitle;
	}
	public String getChapterContent() {
		return chapterContent;
	}
	public void setChapterContent(String chapterContent) {
		this.chapterContent = chapterContent;
	}
	public String getChapterSummary() {
		return chapterSummary;
	}
	public void setChapterSummary(String chapterSummary) {
		this.chapterSummary = chapterSummary;
	}
	public List<Lesson> getListOfLesson() {
		return listOfLesson;
	}
	public void setListOfLesson(List<Lesson> listOfLesson) {
		this.listOfLesson = listOfLesson;
	}
	@Override
	public String toString() {
		return "Chapter [chapterID=" + chapterID + ", courseID=" + courseID + ", chapterTitle=" + chapterTitle
				+ ", chapterContent=" + chapterContent + ", chapterSummary=" + chapterSummary + ", listOfLesson="
				+ listOfLesson + "]";
	}

	

}
