package com.spring.repository.imp;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.domain.Chapter;
import com.spring.repository.ChapterRepository;

@Repository
public class ChapterRepositoryImp implements ChapterRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(ChapterRepositoryImp.class);
	@Autowired
	private SqlSessionFactory sessionFactory;

	@Override
	public List<Chapter> getChapterByCourseID(String courseID) {
		SqlSession session = this.sessionFactory.openSession();
		List<Chapter> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.ChapterMapper.getChapterByCourseID", courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

	@Override
	public Optional<Chapter> getChapterByChapterID(String chapterID) {
		SqlSession session = this.sessionFactory.openSession();
		Chapter chapter = new Chapter();
		try {
			chapter = session.selectOne("com.spring.mapper.ChapterMapper.getChapterByChapterID", chapterID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(chapter);
	}

	@Override
	public String insertChappter(String courseID, String chapterTitle, String chapterContent, String chapterSummary) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("courseID", courseID);
		param.put("chapterTitle", chapterTitle);
		param.put("chapterContent", chapterContent);
		param.put("chapterSummary", chapterSummary);
		String chapterID = null;
		try {
			session.insert("com.spring.mapper.ChapterMapper.insertChappter", param);
			chapterID = String.valueOf(param.get("result"));
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return chapterID;
	}

	@Override
	public int updateChapter(String chapterTitle, String chapterContent, String chapterSummary, String chapterID) {
		SqlSession session = this.sessionFactory.openSession(ExecutorType.BATCH, false);
		Map<String, Object> param = new HashMap<>();
		Map<String, String> columnName = new HashMap<>();
		int resultUpdate = 0;

		param.put("chapterTitle", chapterTitle);
		param.put("chapterContent", chapterContent);
		param.put("chapterSummary", chapterSummary);

		columnName.put("chapterTitle", "tieu_de");
		columnName.put("chapterContent", "noi_dung");
		columnName.put("chapterSummary", "tom_tat");

		try {
			param.entrySet().removeIf(e -> e.getValue() == null);
			for (Map.Entry<String, Object> p2 : param.entrySet()) {
				Map<String, Object> p = new HashMap<>();
				p.put("column", columnName.get(p2.getKey()));
				p.put("value", p2.getValue());
				p.put("chapterID", chapterID);

				resultUpdate += session.update("com.spring.mapper.ChapterMapper.updateChapter", p);
			}

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			session.rollback();
			session.close();
		}
		if (resultUpdate == (param.size() * -2147482646)) {
			session.commit();
			session.close();
			return param.size();

		}
		session.rollback();
		session.close();
		return 0;
	}

	@Override
	public int deleteChapter(String chapterID) {
		SqlSession session = this.sessionFactory.openSession();
		int resultOfDelete = 0;
		try {
			resultOfDelete = session.delete("com.spring.mapper.ChapterMapper.deleteChapter", chapterID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return resultOfDelete;
	}
}
