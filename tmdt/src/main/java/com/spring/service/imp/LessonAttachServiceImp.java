package com.spring.service.imp;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.LessonAttach;
import com.spring.repository.LessonAttachRepository;
import com.spring.service.LessonAttachService;

@Service
public class LessonAttachServiceImp implements LessonAttachService {

	@Autowired
	private LessonAttachRepository lessonAttachRepository;

	@Override
	public Map<String, Object> getLessonAttachByLessonIDWithPaging(int page, int size, String lessonID) {
		return this.lessonAttachRepository.getLessonAttachByLessonIDWithPaging(page, size, lessonID);

	}

	@Override
	public Optional<LessonAttach> getLessonAttachByLessonAttachID(int lessonAttachID) {
		return this.lessonAttachRepository.getLessonAttachByLessonAttachID(lessonAttachID);
	}

	@Override
	public int insertLessonAttach(String lessonID, String lesonAttachContent) {
		return this.lessonAttachRepository.insertLessonAttach(lessonID, lesonAttachContent);
	}

	@Override
	public int deleteLessonAttachBylessonAttachID(int lessonAttachID) {
		return this.lessonAttachRepository.deleteLessonAttachBylessonAttachID(lessonAttachID);
	}

	@Override
	public int updateLessonAttach(int lessonAttachID, String lessonID, String lesonAttachContent) {
		return this.lessonAttachRepository.updateLessonAttach(lessonAttachID, lessonID, lesonAttachContent);
	}

	@Override
	public List<LessonAttach> getLessonAttachByLessonID(String lessonID) {
		return this.lessonAttachRepository.getLessonAttachByLessonID(lessonID);
	}

}
