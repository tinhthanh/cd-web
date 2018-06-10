package com.spring.controller.rest;

import java.util.List;
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
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.Course;
import com.spring.domain.User;
import com.spring.domain.WatchLater;
import com.spring.domain.json.WatchLaterCreate;
import com.spring.service.CourseService;
import com.spring.service.UserService;
import com.spring.service.WatchLaterService;

@RestController
public class WatchLaterRest {

	@Autowired
	private CourseService courseService;
	@Autowired
	private WatchLaterService watchLaterService;
	@Autowired
	private JwtTokenUtil tokenHelper;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/watch_later", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getWatchLaterByUserID(HttpServletRequest request) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		List<WatchLater> result = this.watchLaterService.getWatchLaterByUserID(user.getUserID());
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "list watch later not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/watch_later/{courseID}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> getWatchLaterByUserIDAndCourseID(HttpServletRequest request,
			@PathVariable("courseID") String courseID) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		Optional<WatchLater> result = this.watchLaterService.getWatchLaterByUserIDAndCourseID(user.getUserID(),
				courseID);
		if (!result.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, " watch later not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);

	}

	@RequestMapping(value = "/watch_later/{courseID}", method = RequestMethod.DELETE)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> deleteWatchLater(HttpServletRequest request, @PathVariable("courseID") String courseID) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		Optional<WatchLater> result = this.watchLaterService.getWatchLaterByUserIDAndCourseID(user.getUserID(),
				courseID);
		if (!result.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, " watch later not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			int resultOfDelete = this.watchLaterService.deleteWatchLater(user.getUserID(), courseID);
			if (resultOfDelete < 0) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "delete wathLater failed");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "Successfully deleted");
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
	}

	@RequestMapping(value = "/watch_later", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> insertWatchLater(HttpServletRequest request, @RequestBody WatchLaterCreate watchLater) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		Optional<Course> course = this.courseService.getCourseByCourseID(watchLater.getCourseID());
		System.err.println(course.isPresent());
		if (!course.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "courseID not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int resultOfInser = this.watchLaterService.insertWatchLater(user.getUserID(), watchLater.getCourseID());
		if (resultOfInser < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "creating wathLater failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<WatchLater> watchLaterResult = this.watchLaterService
				.getWatchLaterByUserIDAndCourseID(user.getUserID(), watchLater.getCourseID());
		return new ResponseEntity<Object>(watchLaterResult.get(), HttpStatus.OK);

	}
}
