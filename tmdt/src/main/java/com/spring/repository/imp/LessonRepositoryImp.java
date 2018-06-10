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

import com.spring.domain.Lesson;
import com.spring.repository.LessonRepository;

@Repository
public class LessonRepositoryImp implements LessonRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(LessonRepositoryImp.class);
	@Autowired
	private SqlSessionFactory sessionFactory;

	@Override
	public List<Lesson> getLessonBychapterID(String chapterID) {
		SqlSession session = this.sessionFactory.openSession();
		List<Lesson> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.LessonMapper.getLessonBychapterID", chapterID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<Lesson> getLessonByLessonID(String lessonID) {
		SqlSession session = this.sessionFactory.openSession();
		Lesson lesson = new Lesson();
		try {
			lesson = session.selectOne("com.spring.mapper.LessonMapper.getLessonByLessonID", lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(lesson);
	}

	@Override
	public List<Lesson> getAllLessonRelate(String lessonID) {
		List<Lesson> result = Collections.emptyList();
		SqlSession session = this.sessionFactory.openSession();
		try {
			result = session.selectList("com.spring.mapper.LessonMapper.getAllLessonRelate", lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<Lesson> getFirstLessonInCourse(String courseID) {
		Lesson result = null;
		SqlSession session = this.sessionFactory.openSession();
		try {
			result = session.selectOne("com.spring.mapper.LessonMapper.getFirstLessonInCourse", courseID);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(result);
	}

	public String getCourseIDByLessonID(String lessonID) {
		SqlSession session = this.sessionFactory.openSession();
		String courseID = null;
		try {
			courseID = session.selectOne("com.spring.mapper.LessonMapper.getCourseIDByLessonID", lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return courseID;
	}

	@Override
	public String insertLesson(String lessonTitle, String lessonContent, String chapterID) {
		SqlSession session = this.sessionFactory.openSession();
		String lessonID = null;
		Map<String, Object> param = new HashMap<>();
		param.put("lessonTitle", lessonTitle);
		param.put("lessonContent", lessonContent);
		param.put("chapterID", chapterID);
		param.put("result", lessonID);
		try {
			session.insert("com.spring.mapper.LessonMapper.insertLesson", param);
			lessonID = String.valueOf(param.get("result"));
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return lessonID;
	}

	@Override
	public int updateLesson(String lessonTitle, String lessonContent, String chapterID, String lessonID) {
		SqlSession session = this.sessionFactory.openSession(ExecutorType.BATCH, false);
		Map<String, Object> param = new HashMap<>();
		Map<String, String> columnName = new HashMap<>();
		int resultUpdate = 0;
		param.put("lessonTitle", lessonTitle);
		param.put("lessonContent", lessonContent);
		param.put("chapterID", chapterID);

		columnName.put("lessonTitle", "tieu_de");
		columnName.put("lessonContent", "noi_dung");
		columnName.put("chapterID", "ma_chuong_muc");

		try {
			param.entrySet().removeIf(e -> e.getValue() == null);
			for (Map.Entry<String, Object> p2 : param.entrySet()) {
				Map<String, Object> p = new HashMap<>();
				p.put("column", columnName.get(p2.getKey()));
				p.put("value", p2.getValue());
				p.put("lessonID", lessonID);

				resultUpdate += session.update("com.spring.mapper.LessonMapper.updateLesson", p);
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			session.rollback();
			session.close();
		}

		if (resultUpdate == (param.size() * -2147482646)) {
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

	@Override
	public boolean lessonIsNonCommercial(String lessonID) {
		SqlSession session = this.sessionFactory.openSession();
		byte result = 0;
		try {
			result = session.selectOne("com.spring.mapper.LessonMapper.lessonIsNonCommercial", lessonID);
			} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
	 return  result == 1;
	}

	public int updateViewForlesson(int numberOfviews, String lessonID) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("value", numberOfviews);
		param.put("column", "luot_xem");
		param.put("lessonID", lessonID);
		int resultOfUpdate = 0;
		try {
			resultOfUpdate = session.update("com.spring.mapper.LessonMapper.updateLesson", param);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return resultOfUpdate;
	}

	@Override
	public int deleteLesson(String lessonID) {
		SqlSession session = this.sessionFactory.openSession();
		int resultOfDel = 0;
		try {
			resultOfDel = session.delete("com.spring.mapper.LessonMapper.deleteLesson", lessonID);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return resultOfDel;

	}
}
