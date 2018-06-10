package com.spring.repository;

import java.util.List;
import java.util.Optional;

import com.spring.domain.Lesson;

public interface LessonRepository {
	List<Lesson> getLessonBychapterID(String chapterID);
	
	public Optional<Lesson>getLessonByLessonID(String lessonID);
	
	public List<Lesson>getAllLessonRelate(String lessonID);
	
	public String getCourseIDByLessonID(String lessonID);
	
	public String insertLesson(String lessonTitle, String lessonContent, String chapterID);
	
	public int updateLesson(String lessonTitle, String lessonContent, String chapterID,String lessonID);

	public Optional<Lesson> getFirstLessonInCourse(String courseID);
	
	public int updateViewForlesson(int numberOfviews,String lessonID);
	
	public int deleteLesson(String lessonID);

	public boolean lessonIsNonCommercial(String lessonID);

}
