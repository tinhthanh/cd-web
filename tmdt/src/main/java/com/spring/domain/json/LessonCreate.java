package com.spring.domain.json;

public class LessonCreate {
	private String chapterID;
	private String lessonTitle;
	private String lessonContent;
	public LessonCreate(String chapterID, String lessonTitle, String lessonContent) {
		super();
		this.chapterID = chapterID;
		this.lessonTitle = lessonTitle;
		this.lessonContent = lessonContent;
	}
	public LessonCreate() {
		super();
	}
	public String getChapterID() {
		return chapterID;
	}
	public void setChapterID(String chapterID) {
		this.chapterID = chapterID;
	}
	public String getLessonTitle() {
		return lessonTitle;
	}
	public void setLessonTitle(String lessonTitle) {
		this.lessonTitle = lessonTitle;
	}
	public String getLessonContent() {
		return lessonContent;
	}
	public void setLessonContent(String lessonContent) {
		this.lessonContent = lessonContent;
	}
	@Override
	public String toString() {
		return "LessonCreate [chapterID=" + chapterID + ", lessonTitle=" + lessonTitle + ", lessonContent="
				+ lessonContent + "]";
	}
	
	
	
	

}
