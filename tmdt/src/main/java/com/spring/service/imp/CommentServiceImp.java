package com.spring.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Comment;
import com.spring.repository.CommentRepository;
import com.spring.service.CommentService;

@Service
public class CommentServiceImp implements CommentService {
	@Autowired
	private CommentRepository commentRepository;

	@Override
	public List<Comment> getCommentByLessonID(String lessonID) {
		return this.commentRepository.getCommentByLessonID(lessonID);
	}

	@Override
	public Optional<Comment> getCommentBycommentID(int commentID) {
		return this.commentRepository.getCommentBycommentID(commentID);
	}

	@Override
	public int deleteCommentByCommentID(int commentID) {
		return this.commentRepository.deleteCommentByCommentID(commentID);
	}

	@Override
	public int updateCommentContent(int commentID, String commentContent) {
		return this.commentRepository.updateCommentContent(commentID, commentContent);
	}


	@Override
	public boolean canEditComment(int commentID, String userID) {
		return this.commentRepository.canEditComment(commentID, userID);
	}
}
