package com.spring.domain.json;

public class ChapterCreate {
	private String courseID;
	private String chapterTitle;
	private String chapterContent;
	private String chapterSummary;

	public ChapterCreate(String courseID, String chapterTitle, String chapterContent, String chapterSummary) {
		super();
		this.courseID = courseID;
		this.chapterTitle = chapterTitle;
		this.chapterContent = chapterContent;
		this.chapterSummary = chapterSummary;
	}

	public ChapterCreate() {
		super();
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

	@Override
	public String toString() {
		return "ChapterCreate [courseID=" + courseID + ", chapterTitle=" + chapterTitle + ", chapterContent="
				+ chapterContent + ", chapterSummary=" + chapterSummary + "]";
	}
	
	
	

}
