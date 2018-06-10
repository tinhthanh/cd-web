package com.spring.domain;

import java.util.List;

public class Lesson {
	private String lessonID;
	private String lessonTitle;
	private String lessonContent;
	private String chapterID;
	private Integer views;
	private List<LessonAttach> listOfLessonAttach;
	private List<Comment> listOfComments;

	public Lesson(String lessonID, String lessonTitle, String lessonContent, String chapterID, Integer views,
			List<Comment> listOfComments, List<LessonAttach> listOfLessonAttach) {
		super();
		this.lessonID = lessonID;
		this.lessonTitle = lessonTitle;
		this.lessonContent = lessonContent;
		this.chapterID = chapterID;
		this.views = views;
		this.listOfComments = listOfComments;
		this.listOfLessonAttach = listOfLessonAttach;
	}

	public Lesson(String lessonID, String lessonTitle, String lessonContent, String chapterID, Integer views,
			List<Comment> listOfComments) {
		super();
		this.lessonID = lessonID;
		this.lessonTitle = lessonTitle;
		this.lessonContent = lessonContent;
		this.chapterID = chapterID;
		this.views = views;
		this.listOfComments = listOfComments;
	}

	public Lesson() {
		super();
	}

	public List<LessonAttach> getListOfLessonAttach() {
		return listOfLessonAttach;
	}

	public void setListOfLessonAttach(List<LessonAttach> listOfLessonAttach) {
		this.listOfLessonAttach = listOfLessonAttach;
	}

	public String getLessonID() {
		return lessonID;
	}

	public void setLessonID(String lessonID) {
		this.lessonID = lessonID;
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

	public String getChapterID() {
		return chapterID;
	}

	public void setChapterID(String chapterID) {
		this.chapterID = chapterID;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	public List<Comment> getListOfComments() {
		return listOfComments;
	}

	public void setListOfComments(List<Comment> listOfComments) {
		this.listOfComments = listOfComments;
	}

	@Override
	public String toString() {
		return "Lesson [lessonID=" + lessonID + ", lessonTitle=" + lessonTitle + ", lessonContent=" + lessonContent
				+ ", chapterID=" + chapterID + ", views=" + views + ", listOfComments=" + listOfComments
				+ ", listOfLessonAttach=" + listOfLessonAttach + "]";
	}

}
