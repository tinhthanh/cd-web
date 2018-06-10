package com.spring.service;

import java.util.List;
import java.util.Optional;

import com.spring.domain.Lesson;

public interface LessonService {
	Optional<Lesson> getLessonByLessonID(String lessonID);

	public List<Lesson> getAllLessonRelate(String lessonID);

	public String getCourseIDByLessonID(String lessonID);
  
	public String insertLesson(String lessonTitle, String lessonContent, String chapterID);
	
	public int updateLesson(String lessonTitle, String lessonContent, String chapterID,String lessonID);

	public Optional<Lesson> getFirstLessonInCourse(String courseID);
	
	public int addViewForlesson(int numberOfviews,String lessonID);

	public boolean lessonIsNonCommercial(String lessonID);
	public int deleteLesson(String lessonID);
}
