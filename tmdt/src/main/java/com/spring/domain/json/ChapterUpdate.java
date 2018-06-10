package com.spring.domain.json;

public class ChapterUpdate {
	private String chapterID;
	private String chapterTitle;
	private String chapterContent;
	private String chapterSummary;

	public ChapterUpdate(String chapterID, String chapterTitle, String chapterContent, String chapterSummary) {
		super();
		this.chapterID = chapterID;
		this.chapterTitle = chapterTitle;
		this.chapterContent = chapterContent;
		this.chapterSummary = chapterSummary;
	}
	
	

	public ChapterUpdate() {
		super();
	}



	public String getChapterID() {
		return chapterID;
	}

	public void setChapterID(String chapterID) {
		this.chapterID = chapterID;
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
		return "ChapterUpdate [chapterID=" + chapterID + ", chapterTitle=" + chapterTitle + ", chapterContent="
				+ chapterContent + ", chapterSummary=" + chapterSummary + "]";
	}

}
