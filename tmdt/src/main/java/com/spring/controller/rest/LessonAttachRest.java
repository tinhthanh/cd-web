package com.spring.controller.rest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.Lesson;
import com.spring.domain.LessonAttach;
import com.spring.domain.User;
import com.spring.domain.json.LessonAttachCreate;
import com.spring.domain.json.LessonAttachUpdate;
import com.spring.service.LessonAttachService;
import com.spring.service.LessonService;
import com.spring.service.PermissionCheck;
import com.spring.service.UserService;

@RestController
public class LessonAttachRest {
	@Autowired
	private LessonAttachService lessonAttachService;
	@Autowired
	private LessonService lessonService;
	@Autowired
	private PermissionCheck permissionCheck;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/admin/lesson/{lessonID}/lesson_attach", params = { "page", "size" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getLessonAttachByLessonIDWithPaging(
			@RequestParam(name = "page", defaultValue = "1") int page,
			@RequestParam(name = "size", defaultValue = "1") int size, @PathVariable("lessonID") String lessonID) {

		Optional<Lesson> lesson = this.lessonService.getLessonByLessonID(lessonID);
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			Map<String, Object> result = lessonAttachService.getLessonAttachByLessonIDWithPaging(page, size, lessonID);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/lesson/{lessonID}/lesson_attach", method = RequestMethod.GET)
	@PreAuthorize("IsCourseAuthorOrIsRegisteredCourse(#lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getLessonAttachByLessonID(@PathVariable("lessonID") String lessonID) {

		Optional<Lesson> lesson = this.lessonService.getLessonByLessonID(lessonID);
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		List<LessonAttach> lessonAttach = this.lessonAttachService.getLessonAttachByLessonID(lessonID);
		return new ResponseEntity<Object>(lessonAttach, HttpStatus.OK);

	}

	@RequestMapping(value = "/lesson/{lessonID}/lesson_attach/{lessonAttachID}", method = RequestMethod.GET)
	@PreAuthorize("IsCourseAuthorOrIsRegisteredCourse(#lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getLessonAttachByLessonAttachID(@PathVariable("lessonID") String lessonID,
			@PathVariable("lessonAttachID") int lessonAttachID, HttpServletRequest request) {

		String authToken = this.jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(this.jwtTokenUtil.getUsernameFromToken(authToken));
		Optional<Lesson> lesson = this.lessonService.getLessonByLessonID(lessonID);
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		Optional<LessonAttach> lessonAttach = this.lessonAttachService.getLessonAttachByLessonAttachID(lessonAttachID);
		String lessonIDByLessonAttachID = lessonAttach.get().getLessonID();
		if (!permissionCheck.checkIsCourseAuthorOrIsRegisteredCourse(lessonIDByLessonAttachID, user.getUserID())) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.METHOD_NOT_ALLOWED,
					"Invalid lessonAttachID you are not course author or registered course");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		return new ResponseEntity<Object>(lessonAttach.get(), HttpStatus.OK);

	}

	@RequestMapping(value = "/lesson/lesson_attach", method = RequestMethod.POST)
	@PreAuthorize("isCourseAuthorByLessonID(#lessonAttach.lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> insertLessonAttach(@RequestBody LessonAttachCreate lessonAttach) {
		Optional<Lesson> lesson = this.lessonService.getLessonByLessonID(lessonAttach.getLessonID());
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int lessonAttachID = this.lessonAttachService.insertLessonAttach(lessonAttach.getLessonID(),
				lessonAttach.getLesonAttachContent());
		if (lessonAttachID < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "create lesson attach failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<LessonAttach> lessonAttachResult = this.lessonAttachService
				.getLessonAttachByLessonAttachID(lessonAttachID);
		return new ResponseEntity<Object>(lessonAttachResult.get(), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/lesson/lesson_attach", method = RequestMethod.PATCH)
	@PreAuthorize("isCourseAuthorByLessonID(#lessonAttachUpdate.lessonID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateLessonAttach(@RequestBody LessonAttachUpdate lessonAttachUpdate) {
		Optional<LessonAttach> lessonAttach = this.lessonAttachService
				.getLessonAttachByLessonAttachID(lessonAttachUpdate.getLessonAttachID());
		if (!lessonAttach.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson attach not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		int resultOfUpdate = this.lessonAttachService.updateLessonAttach(lessonAttachUpdate.getLessonAttachID(),
				lessonAttachUpdate.getLessonID(), lessonAttachUpdate.getLesonAttachContent());

		long updateFieldCount = lessonAttachUpdate.getNonNullFieldCount();
		if (resultOfUpdate < updateFieldCount - 1) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "update lesson attach failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<LessonAttach> lessonAttachAfterUpdate = this.lessonAttachService
				.getLessonAttachByLessonAttachID(lessonAttachUpdate.getLessonAttachID());

		return new ResponseEntity<Object>(lessonAttachAfterUpdate.get(), HttpStatus.OK);
	}

	@RequestMapping(value = "/lesson/lesson_attach/{lessonAttachID}", method = RequestMethod.DELETE)
	@PreAuthorize("hasRole('ROLE_USER')||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteLessonAttach(@PathVariable("lessonAttachID") int lessonAttachID,
			HttpServletRequest request) {
		String authToken = this.jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(this.jwtTokenUtil.getUsernameFromToken(authToken));
		Optional<LessonAttach> lessonAttach = this.lessonAttachService.getLessonAttachByLessonAttachID(lessonAttachID);

		if (!lessonAttach.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lesson attach not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {

			String lessonIDByLessonAttachID = lessonAttach.get().getLessonID();

			if ((!permissionCheck.isCourseAuthorByLessonID(user.getUserID(), lessonIDByLessonAttachID)
					&& !user.getPermission().stream().anyMatch(e -> e.getRoleName().equals("ROLE_ADMIN")))
					|| !user.getPermission().stream().anyMatch(e -> e.getRoleName().equals("ROLE_ADMIN"))) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.METHOD_NOT_ALLOWED,
						"Invalid lessonAttachID you are not course author or registered course");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
		}

		int resultOfDelete = this.lessonAttachService.deleteLessonAttachBylessonAttachID(lessonAttachID);
		if (resultOfDelete < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "delete lesson attach failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "delete lesson attach successfully");
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());

	}

}
