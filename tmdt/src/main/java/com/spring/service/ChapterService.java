package com.spring.service;

import java.util.List;
import java.util.Optional;

import com.spring.domain.Chapter;

public interface ChapterService {
	public List<Chapter> getChapterByCourseID(String courseID);

	public Optional<Chapter> getChapterByChapterID(String chapterID);

	public String insertChappter(String courseID, String chapterTitle, String chapterContent, String chapterSummary);

	public int updateChapter(String chapterTitle, String chapterContent, String chapterSummary, String chapterID);
	
	public int deleteChapter(String chapterID);

}
