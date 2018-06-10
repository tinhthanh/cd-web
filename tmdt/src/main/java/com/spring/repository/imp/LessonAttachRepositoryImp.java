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

import com.spring.domain.LessonAttach;
import com.spring.repository.LessonAttachRepository;

@Repository
public class LessonAttachRepositoryImp implements LessonAttachRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(LessonAttachRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public Map<String, Object> getLessonAttachByLessonIDWithPaging(int page, int size, String lessonID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		param.put("lessonID", lessonID);
		try {
			List<LessonAttach> listCourseResult = session
					.selectList("com.spring.mapper.LessonAttachMapper.getLessonAttachByLessonIDWithPaging", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourseResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<LessonAttach> getLessonAttachByLessonAttachID(int lessonAttachID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		LessonAttach lessonAttach = new LessonAttach();
		try {
			lessonAttach = session.selectOne("com.spring.mapper.LessonAttachMapper.getLessonAttachByLessonAttachID",
					lessonAttachID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(lessonAttach);
	}

	@Override
	public List<LessonAttach> getLessonAttachByLessonID(String lessonID) {
		List<LessonAttach> lessonAttachs = Collections.emptyList();
		SqlSession session = this.sqlSessionFactory.openSession();
		try {
			lessonAttachs = session.selectList("com.spring.mapper.LessonAttachMapper.getLessonAttachByLessonID",
					lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return lessonAttachs;
	}

	@Override
	public int insertLessonAttach(String lessonID, String lesonAttachContent) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("lessonID", lessonID);
		param.put("lesonAttachContent", lesonAttachContent);
		int result = 0;
		try {
			session.insert("com.spring.mapper.LessonAttachMapper.insertLessonAttach", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int deleteLessonAttachBylessonAttachID(int lessonAttachID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		int result = 0;
		try {
			result = session.delete("com.spring.mapper.LessonAttachMapper.deleteLessonAttachBylessonAttachID",
					lessonAttachID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int updateLessonAttach(int lessonAttachID, String lessonID, String lesonAttachContent) {

		SqlSession session = this.sqlSessionFactory.openSession(ExecutorType.BATCH, false);
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> columnName = new HashMap<>();
		columnName.put("lessonID", "ma_bai_hoc");
		columnName.put("lesonAttachContent", "noi_dung");

		param.put("lessonID", lessonID);
		param.put("lesonAttachContent", lesonAttachContent);
		int[] resultUpdate = { 0 };
		try {
			param.entrySet().removeIf(e -> e.getValue() == null);
			param.entrySet().stream().forEach(p -> {
				Map<String, Object> paramUpdate = new HashMap<>();
				paramUpdate.put("LessonAttachAtr", columnName.get(p.getKey()));
				paramUpdate.put("values", p.getValue());
				paramUpdate.put("lessonAttachID", lessonAttachID);
				resultUpdate[0] += session.update("com.spring.mapper.LessonAttachMapper.updateLessonAttach",
						paramUpdate);

			});

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			session.rollback();
			session.close();
		}
		if (resultUpdate[0] == (param.size() * -2147482646)) {
			try {
				session.commit();
				session.close();
				return param.size();

			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}
		}
		session.rollback();
		session.close();
		return 0;
	}
}
