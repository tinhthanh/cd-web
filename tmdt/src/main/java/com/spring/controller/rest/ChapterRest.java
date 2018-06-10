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
import com.spring.domain.Chapter;
import com.spring.domain.Course;
import com.spring.domain.json.ChapterCreate;
import com.spring.domain.json.ChapterUpdate;
import com.spring.service.ChapterService;
import com.spring.service.CourseService;

@RestController
public class ChapterRest {

	@Autowired
	private ChapterService chapterService;
	@Autowired
	private CourseService courseService;

	@RequestMapping(value = "/users/course/{courseID}/chapter", method = RequestMethod.GET)
	public ResponseEntity<?> getChapterByCourseID(@PathVariable("courseID") String courseID) {
		if (!courseService.getCourseByCourseID(courseID).isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "course not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			List<Chapter> result = chapterService.getChapterByCourseID(courseID);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/course/chapter", method = RequestMethod.POST)
	@PreAuthorize("canEditCourse(#chapterCreate.courseID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> insertChappter(@RequestBody ChapterCreate chapterCreate) {
		Optional<Course> course = courseService.getCourseByCourseID(chapterCreate.getCourseID());
		if (!course.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "course not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		String resultOfInsert = this.chapterService.insertChappter(chapterCreate.getCourseID(),
				chapterCreate.getChapterTitle(), chapterCreate.getChapterContent(), chapterCreate.getChapterSummary());
		if (resultOfInsert == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "course create failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<Chapter> chapter = this.chapterService.getChapterByChapterID(resultOfInsert);

		return new ResponseEntity<Object>(chapter.get(), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/course/chapter", method = RequestMethod.PATCH)
	@PreAuthorize("isCourseAuthorByChapterID(#chapterUpdate.chapterID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateChapter(@RequestBody ChapterUpdate chapterUpdate) {
		Optional<Chapter> chapter = this.chapterService.getChapterByChapterID(chapterUpdate.getChapterID());
		if (!chapter.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "chapter not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int resultOfUpdate = this.chapterService.updateChapter(chapterUpdate.getChapterTitle(),
				chapterUpdate.getChapterContent(), chapterUpdate.getChapterSummary(), chapterUpdate.getChapterID());
		if (resultOfUpdate < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "update chapter failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<Chapter> chapterAfterUpdate = this.chapterService.getChapterByChapterID(chapterUpdate.getChapterID());
		return new ResponseEntity<Object>(chapterAfterUpdate.get(), HttpStatus.OK);
	}

	@RequestMapping(value = "/course/chapter/{chapterID}", method = RequestMethod.DELETE)
	@PreAuthorize("isCourseAuthorByChapterID(#chapterID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> deleteChapter(@PathVariable("chapterID") String chapterID) {
		Optional<Chapter> chapter = this.chapterService.getChapterByChapterID(chapterID);
		if (!chapter.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "chapter not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		int resultOfDel = this.chapterService.deleteChapter(chapterID);
		if (resultOfDel < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "delete chapter failed");
			return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.OK, "delete chapter successfully");
		return new ResponseEntity<>(apiMessage, apiMessage.getStatus());
	}
}
