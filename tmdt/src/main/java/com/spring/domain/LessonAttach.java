package com.spring.domain;

import java.time.LocalDateTime;

public class LessonAttach {
	private int lessonAttachID;
	private String lessonID;
	private String lesonAttachContent;
	private LocalDateTime dayAdded;

	public LessonAttach(int lessonAttachID, String lessonID, String lesonAttachContent, LocalDateTime dayAdded) {
		super();
		this.lessonAttachID = lessonAttachID;
		this.lessonID = lessonID;
		this.lesonAttachContent = lesonAttachContent;
		this.dayAdded = dayAdded;
	}

	public LessonAttach() {
		super();
	}

	public int getLessonAttachID() {
		return lessonAttachID;
	}

	public void setLessonAttachID(int lessonAttachID) {
		this.lessonAttachID = lessonAttachID;
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

	public LocalDateTime getDayAdded() {
		return dayAdded;
	}

	public void setDayAdded(LocalDateTime dayAdded) {
		this.dayAdded = dayAdded;
	}

	@Override
	public String toString() {
		return "LessonAttach [lessonAttachID=" + lessonAttachID + ", lessonID=" + lessonID + ", lesonAttachContent="
				+ lesonAttachContent + ", dayAdded=" + dayAdded + "]";
	}

}
