package com.spring.domain.json;

public class LessonAttachCreate {
	private String lessonID;
	private String lesonAttachContent;
	public LessonAttachCreate(String lessonID, String lesonAttachContent) {
		super();
		this.lessonID = lessonID;
		this.lesonAttachContent = lesonAttachContent;
	}
	public LessonAttachCreate() {
		super();
	}
	public String getLessonID() {
		return lessonID;
	}
	public void setLessonID(String lessonID) {
		this.lessonID = lessonID;
	}
	public String getLesonAttachContent() {
		return lesonAttachContent;
	}
	public void setLesonAttachContent(String lesonAttachContent) {
		this.lesonAttachContent = lesonAttachContent;
	}
	@Override
	public String toString() {
		return "LessonAttachCreate [lessonID=" + lessonID + ", lesonAttachContent=" + lesonAttachContent + "]";
	}
	

}
