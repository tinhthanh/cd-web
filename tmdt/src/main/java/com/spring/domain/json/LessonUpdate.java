package com.spring.domain.json;

public class LessonUpdate {
	private String lessonID;
	private String chapterID;
	private String lessonTitle;
	private String lessonContent;
	public LessonUpdate(String lessonID, String chapterID, String lessonTitle, String lessonContent) {
		super();
		this.lessonID = lessonID;
		this.chapterID = chapterID;
		this.lessonTitle = lessonTitle;
		this.lessonContent = lessonContent;
	}
	public LessonUpdate() {
		super();
	}
	public String getLessonID() {
		return lessonID;
	}
	public void setLessonID(String lessonID) {
		this.lessonID = lessonID;
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
		return "LessonUpdate [lessonID=" + lessonID + ", chapterID=" + chapterID + ", lessonTitle=" + lessonTitle
				+ ", lessonContent=" + lessonContent + "]";
	}


}
