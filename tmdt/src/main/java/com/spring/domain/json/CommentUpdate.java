package com.spring.domain.json;

public class CommentUpdate {
	private int commentID;
	private String commentContent;

	public CommentUpdate(int commentID, String commentContent) {
		super();
		this.commentID = commentID;
		this.commentContent = commentContent;
	}

	public CommentUpdate() {
		super();
	}

	public int getCommentID() {
		return commentID;
	}

	public void setCommentID(int commentID) {
		this.commentID = commentID;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	@Override
	public String toString() {
		return "CommentUpdate [commentID=" + commentID + ", commentContent=" + commentContent + "]";
	}

}
