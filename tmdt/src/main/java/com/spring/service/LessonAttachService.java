package com.spring.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.LessonAttach;

public interface LessonAttachService {

	public Map<String, Object> getLessonAttachByLessonIDWithPaging(int page, int size, String lessonID);
	
	public Optional<LessonAttach>getLessonAttachByLessonAttachID(int lessonAttachID);
	
	public List<LessonAttach> getLessonAttachByLessonID(String lessonID);
	
	public int insertLessonAttach(String lessonID,String lesonAttachContent);
	
	public int deleteLessonAttachBylessonAttachID(int lessonAttachID);
	
	public int updateLessonAttach(int lessonAttachID,String lessonID,String lesonAttachContent);
	

}
