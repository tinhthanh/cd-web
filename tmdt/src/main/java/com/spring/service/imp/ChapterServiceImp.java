package com.spring.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Chapter;
import com.spring.repository.ChapterRepository;
import com.spring.service.ChapterService;

@Service
public class ChapterServiceImp implements ChapterService {
	@Autowired
	private ChapterRepository chapterRepository;

	@Override
	public List<Chapter> getChapterByCourseID(String courseID) {
		return this.chapterRepository.getChapterByCourseID(courseID);
	}

	@Override
	public String insertChappter(String courseID, String chapterTitle, String chapterContent, String chapterSummary) {
		return this.chapterRepository.insertChappter(courseID, chapterTitle, chapterContent, chapterSummary);
	}

	@Override
	public int updateChapter(String chapterTitle, String chapterContent, String chapterSummary, String chapterID) {
		return this.chapterRepository.updateChapter(chapterTitle, chapterContent, chapterSummary, chapterID);
	}

	@Override
	public Optional<Chapter> getChapterByChapterID(String chapterID) {
		return this.chapterRepository.getChapterByChapterID(chapterID);
	}

	@Override
	public int deleteChapter(String chapterID) {
		return this.chapterRepository.deleteChapter(chapterID);
	}
}
