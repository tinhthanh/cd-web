package com.spring.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Lesson;
import com.spring.repository.LessonRepository;
import com.spring.service.LessonService;

@Service
public class LessonServiceImp implements LessonService {
	@Autowired
	private LessonRepository lessonRepository;

	@Override
	public Optional<Lesson> getLessonByLessonID(String lessonID) {
		return lessonRepository.getLessonByLessonID(lessonID);
	}

	@Override
	public List<Lesson> getAllLessonRelate(String lessonID) {
		return this.lessonRepository.getAllLessonRelate(lessonID);
	}

	@Override
	public Optional<Lesson> getFirstLessonInCourse(String courseID) {
		return this.lessonRepository.getFirstLessonInCourse(courseID);
	}

	@Override
	public String getCourseIDByLessonID(String lessonID) {
		return this.lessonRepository.getCourseIDByLessonID(lessonID);
	}

	@Override
	public String insertLesson(String lessonTitle, String lessonContent, String chapterID) {
		return this.lessonRepository.insertLesson(lessonTitle, lessonContent, chapterID);
	}

	@Override
	public int updateLesson(String lessonTitle, String lessonContent, String chapterID, String lessonID) {
		return this.lessonRepository.updateLesson(lessonTitle, lessonContent, chapterID, lessonID);
	}

	@Override
	public boolean lessonIsNonCommercial(String lessonID) {
		return this.lessonRepository.lessonIsNonCommercial(lessonID);
	}
	public int addViewForlesson(int numberOfviews, String lessonID) {
		Optional<Lesson> lesson = this.lessonRepository.getLessonByLessonID(lessonID);
		int oldView = lesson.get().getViews();
		return this.lessonRepository.updateViewForlesson(oldView + numberOfviews, lessonID);
	}

	@Override
	public int deleteLesson(String lessonID) {
		return this.lessonRepository.deleteLesson(lessonID);
	}
}
