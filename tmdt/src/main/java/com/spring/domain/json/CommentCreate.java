package com.spring.domain.json;

public class CommentCreate {
	private String lessonID;
	private String userID;
	private String commentContent;
	public CommentCreate(String lessonID, String userID, String commentContent) {
		super();
		this.lessonID = lessonID;
		this.userID = userID;
		this.commentContent = commentContent;
	}
	public CommentCreate() {
		super();
	}
	public String getLessonID() {
		return lessonID;
	}
	public void setLessonID(String lessonID) {
		this.lessonID = lessonID;
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getCommentContent() {
		return commentContent;
	}
	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}
	@Override
	public String toString() {
		return "CommentCreate [lessonID=" + lessonID + ", userID=" + userID + ", commentContent=" + commentContent
				+ "]";
	}
	
	

}
