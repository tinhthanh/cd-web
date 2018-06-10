package com.spring.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Chapter;
import com.spring.domain.CourseRegister;
import com.spring.service.ChapterService;
import com.spring.service.CommentService;
import com.spring.service.CourseRegisterSerivce;
import com.spring.service.CourseService;
import com.spring.service.LessonService;
import com.spring.service.PermissionCheck;

@Service
public class PermissionCheckImp implements PermissionCheck {
	@Autowired
	private CourseService courseService;
	@Autowired
	private CommentService commentService;
	@Autowired
	private CourseRegisterSerivce courseRegisterSerivce;
	@Autowired
	private LessonService lessonService;
	@Autowired
	private ChapterService chapterService;

	@Override
	public boolean isCourseAuthor(String accountID, String courseID) {
		return this.courseService.isCourseAuthor(accountID, courseID);
	}

	@Override
	public boolean isRegisteredCourse(String userID, String courseID) {
		return this.courseService.isRegisteredCourse(userID, courseID);
	}

	@Override
	public boolean canEditComment(int commentID, String userID) {
		return this.commentService.canEditComment(commentID, userID);
	}

	@Override
	public boolean checkIsCourseAuthorOrIsRegisteredCourse(String lessonID, String userID) {
		String courseID = this.lessonService.getCourseIDByLessonID(lessonID);
		List<CourseRegister> courseRegisters = this.courseRegisterSerivce.getListCourseRegisterByCourseID(courseID);
		boolean IsRegisteredCourse = courseRegisters.stream()
				.anyMatch(c -> c.getUserRegister().getUserID().equals(userID));
		return this.courseService.isCourseAuthor(userID, courseID) || IsRegisteredCourse;
	}

	@Override
	public boolean isCourseAuthorByChapterID(String accountID, String chapterID) {
		Optional<Chapter> chapter = this.chapterService.getChapterByChapterID(chapterID);
		if (!chapter.isPresent()) {
			return false;
		}
		return this.courseService.isCourseAuthor(accountID, chapter.get().getCourseID());
	}

	@Override
	public boolean isCourseAuthorByLessonID(String lessonID, String userID) {
		String courseID = this.lessonService.getCourseIDByLessonID(lessonID);
		return this.courseService.isCourseAuthor(userID, courseID);
	}

	@Override
	public boolean isRegisteredCourseFromLesson(String userID, String lessonID) {
		String courseID = this.lessonService.getCourseIDByLessonID(lessonID);
		List<CourseRegister> courseRegisters = this.courseRegisterSerivce.getListCourseRegisterByCourseID(courseID);
		boolean IsRegisteredCourse = courseRegisters.stream()
				.anyMatch(c -> c.getUserRegister().getUserID().equals(userID));
		return IsRegisteredCourse;
	}
}
