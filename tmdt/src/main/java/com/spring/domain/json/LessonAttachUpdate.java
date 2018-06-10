package com.spring.domain.json;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

public class LessonAttachUpdate {
	private int lessonAttachID;
	private String lessonID;
	private String lesonAttachContent;

	public LessonAttachUpdate(int lessonAttachID, String lessonID, String lesonAttachContent) {
		super();
		this.lessonAttachID = lessonAttachID;
		this.lessonID = lessonID;
		this.lesonAttachContent = lesonAttachContent;
	}

	public LessonAttachUpdate() {
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

	@Override
	public String toString() {
		return "LessonAttachUpdate [lessonAttachID=" + lessonAttachID + ", lessonID=" + lessonID
				+ ", lesonAttachContent=" + lesonAttachContent + "]";
	}

	public <T> long getNonNullFieldCount() {
		List<Function<? super LessonAttachUpdate, ? extends Object>> functionList = new ArrayList<>();
		functionList.add(LessonAttachUpdate::getLessonAttachID);
		functionList.add(LessonAttachUpdate::getLessonID);
		functionList.add(LessonAttachUpdate::getLesonAttachContent);
		return functionList.stream().map(f -> f.apply(this)).filter(Objects::nonNull).count();
	}

}
