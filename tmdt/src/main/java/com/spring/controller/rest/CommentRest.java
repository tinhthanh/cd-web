package com.spring.controller.rest;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.domain.Comment;
import com.spring.domain.Lesson;
import com.spring.domain.json.CommentUpdate;
import com.spring.service.CommentService;
import com.spring.service.LessonService;

@RestController
public class CommentRest {
	@Autowired
	private CommentService commentService;
	@Autowired
	private LessonService lessonService;

	@RequestMapping(value = "/lesson{lessonID}/comment", method = RequestMethod.GET)
	@PreAuthorize("isRegisteredCourse(#lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getCommentByLessonID(@PathVariable("lessonID") String lessonID) {
		Optional<Lesson> lesson = lessonService.getLessonByLessonID(lessonID);
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			List<Comment> listComment = this.commentService.getCommentByLessonID(lessonID);
			if (listComment.isEmpty()) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no comment found");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			return new ResponseEntity<Object>(listComment, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/comment/{commentID}", method = RequestMethod.GET)
	@PreAuthorize("isRegisteredCourse(#lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getCommentBycommentID(@PathVariable("commentID") int commentID) {
		Optional<Comment> comment = this.commentService.getCommentBycommentID(commentID);
		if (!comment.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "comment not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());

		}
		return new ResponseEntity<Object>(comment.get(), HttpStatus.OK);
	}

	@RequestMapping(value = "/comment/{commentID}", method = RequestMethod.DELETE)
	@PreAuthorize("canEditComment(#commentID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteCommentByCommentID(@PathVariable("commentID") int commentID) {
		Optional<Comment> comment = this.commentService.getCommentBycommentID(commentID);
		if (!comment.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "comment not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			int result = this.commentService.deleteCommentByCommentID(commentID);
			if (result > 0) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "comment deleted successfully");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			} else {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "comment deleted failed");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
		}

	}

	@RequestMapping(value = "/comment", method = RequestMethod.PATCH)
	@PreAuthorize("canEditComment(#commentID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateCommentContent(@RequestBody CommentUpdate commentUpdate) {
		Optional<Comment> comment = this.commentService.getCommentBycommentID(commentUpdate.getCommentID());
		if (!comment.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "comment not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int resultOfUpdate = this.commentService.updateCommentContent(commentUpdate.getCommentID(),
				commentUpdate.getCommentContent());
		if (resultOfUpdate < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "comment update failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<Comment> commentAfterUpdate = this.commentService.getCommentBycommentID(commentUpdate.getCommentID());
		return new ResponseEntity<Object>(commentAfterUpdate.get(), HttpStatus.OK);
	}

}
