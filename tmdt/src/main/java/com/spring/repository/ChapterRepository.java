package com.spring.repository;

import java.util.List;
import java.util.Optional;

import com.spring.domain.Chapter;

public interface ChapterRepository {

	public List<Chapter> getChapterByCourseID(String courseID);

	public Optional<Chapter> getChapterByChapterID(String chapterID);

	public String insertChappter(String courseID, String chapterTitle, String chapterContent, String chapterSummary);

	public int updateChapter(String chapterTitle, String chapterContent, String chapterSummary, String chapterID);
	
	public int deleteChapter(String chapterID);

}
