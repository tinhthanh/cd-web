package com.spring.repository.imp;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

import com.spring.domain.Course;
import com.spring.domain.Topic;
import com.spring.domain.custom.Author;
import com.spring.repository.CourseRepository;

@Repository
public class CourseRepositoryImp implements CourseRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(CourseRepositoryImp.class);
	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public Optional<Course> getCourseByCourseID(String courseID) {
		SqlSession session = sqlSessionFactory.openSession();
		Course result = null;
		try {
			result = session.selectOne("com.spring.mapper.CourseMapper.getCourseByCourseID", courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(result);
	}

	@Override
	public Map<String, Object> getCourseWithPaging(int page, int size) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			List<Course> listCourseResult = sqlSession.selectList("com.spring.mapper.CourseMapper.getCourseWithPaging",
					param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourseResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> getCourseByTopicIDWithPaging(int page, int size, String TopicID) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			param.put("topicID", TopicID);
			List<Course> listTopicResult = sqlSession
					.selectList("com.spring.mapper.CourseMapper.getCourseByTopicIDWithPaging", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public int updateCourseStatus(String courseID, int newStatus) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("newStatus", newStatus);
		param.put("courseID", courseID);
		int numberOfrecordEffect = 0;
		try {
			numberOfrecordEffect = session.update("com.spring.mapper.CourseMapper.updateCourseStatus", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return numberOfrecordEffect;
	}

	@Override
	public String createCourse(String courseTitle, String courseDescription, String author, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("courseTitle", courseTitle);
		param.put("courseDescription", courseDescription);
		param.put("author", author);
		param.put("price", price);
		param.put("courseTypeID", courseTypeID);
		param.put("topicID", topicID);
		param.put("courseAvatar", courseAvatar);
		param.put("courseDetail", courseDetail);
		String courseID = new String();
		try {
			List<Map<String, Object>> resultOfInsert = session.selectList("com.spring.mapper.CourseMapper.createCourse",
					param);
			if (resultOfInsert.isEmpty()) {
				return courseID;
			} else {
				for (Map<String, Object> map : resultOfInsert) {
					if (!map.isEmpty() && map.containsKey("courseID")) {
						courseID = (String) map.get("courseID");
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return courseID;
	}

	@Override
	public int updateCourse(String courseID, String courseTitle, String courseDescription, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail, Integer newStatus) {
		Map<String, Object> param = new HashMap<>();
		Map<String, String> columName = new HashMap<>();
		int resultUpdate = 0;
		columName.put("courseTitle", "tieu_de");
		columName.put("courseDescription", "mo_ta");
		columName.put("price", "don_gia");
		columName.put("courseTypeID", "ma_loai_khoa_hoc");
		columName.put("topicID", "ma_chu_de");
		columName.put("courseAvatar", "anh_dai_dien");
		columName.put("courseDetail", "chi_tiet_khoa_hoc");
		columName.put("newStatus", "trang_thai");

		param.put("courseTitle", courseTitle);
		param.put("courseDescription", courseDescription);
		param.put("price", price);
		param.put("courseTypeID", courseTypeID);
		param.put("topicID", topicID);
		param.put("courseAvatar", courseAvatar);
		param.put("courseDetail", courseDetail);
		param.put("newStatus", newStatus);
		SqlSession session = this.sqlSessionFactory.openSession(ExecutorType.BATCH, false);
		try {
			param.entrySet().removeIf(e -> e.getValue() == null);

			for (Map.Entry<String, Object> p2 : param.entrySet()) {

				Map<String, Object> p = new HashMap<>();
				p.put("courseID", courseID);
				p.put("courseProperties", columName.get(p2.getKey()));
				p.put("coursePropertiesValue", p2.getValue());
				resultUpdate += session.update("com.spring.mapper.CourseMapper.updateCourse", p);
			}
		} catch (Exception e) {
			session.rollback();
			LOGGER.error(e.getMessage());
		}
		if (resultUpdate == (param.size() * -2147482646)) {
			try {
				session.commit();
				return param.size();

			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}
		}
		session.rollback();
		return 0;

	}

	@Override
	public Map<String, Object> getRelateCourse(int page, int size, String courseID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		param.put("courseID", courseID);
		try {
			List<Course> listCourses = session.selectList("com.spring.mapper.CourseMapper.getRelateCourse", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourses);
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
	public Optional<Author> getAuthorInfo(String authorID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Author author = new Author();
		try {
			author = session.selectOne("com.spring.mapper.CourseMapper.getAuthorInfo", authorID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(author);
	}

	@Override
	public List<Course> getCourseByAuthorIDSortByView(String authorID, String sortType, int limitRecord) {
		SqlSession session = this.sqlSessionFactory.openSession();
		List<Course> result = Collections.emptyList();
		Map<String, Object> param = new HashMap<>();
		param.put("authorID", authorID);
		param.put("sortType", sortType);
		param.put("limitRecord", limitRecord);
		try {
			result = session.selectList("com.spring.mapper.CourseMapper.getCourseByAuthorIDSortByView", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> getAllCourseAuthorIdWithSortAndPaging(int page, int size, String authorID,
			String sortPropertie) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> columnName = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		param.put("authorID", authorID);

		columnName.put("courseID", "ma_khoa_hoc");
		columnName.put("courseTitle", "tieu_de");
		columnName.put("courseDescription", "mo_ta");
		columnName.put("createDate", "ngay_tao");
		columnName.put("price", "don_gia");
		columnName.put("views", "ma_khoa_hoc");
		columnName.put("courseType", "ma_loai_khoa_hoc");

		try {

			param.put("sortPropertie", columnName.get(sortPropertie));
			List<Course> listCourses = session
					.selectList("com.spring.mapper.CourseMapper.getAllCourseAuthorIdWithSortAndPaging", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourses);
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
	public boolean isRegisteredCourse(String userID, String courseID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		int result = 0;
		try {
			param.put("userID", userID);
			param.put("courseID", courseID);

			result = session.selectOne("com.spring.mapper.CourseMapper.isRegisteredCourse", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result == 1;
	}

	@Override
	public Map<String, Object> getListCoursesFeatured(int page, int size) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			List<Topic> listTopicResult = sqlSession.selectList("com.spring.mapper.CourseMapper.getListCoursesFeatured",
					param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public int updateViewForCourse(int view, String courseID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		int resultOfUpdate = 0;
		Map<String, Object> param = new HashMap<>();
		param.put("courseID", courseID);
		param.put("courseProperties", "luot_truy_cap");
		param.put("coursePropertiesValue", view);
		try {
			resultOfUpdate = session.update("com.spring.mapper.CourseMapper.updateCourse", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return resultOfUpdate;
	}

	@Override
	public Map<String, Object> searchByCourseName(int page, int size, String keySearch) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			param.put("keySearch", keySearch);
			List<Course> listCourseResult = sqlSession.selectList("com.spring.mapper.CourseMapper.searchByCourseName",
					param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listCourseResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public void updateViewByCourseID(String courseID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		try {
			session.update("com.spring.mapper.CourseMapper.updateViewByCourseID", courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
	}

	@Override
	public Optional<Course> getCourseByLessonID(String lessonID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Course course = new Course();
		try {
			course = session.selectOne("com.spring.mapper.CourseMapper.getCourseByLessonID", lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(course);
	}

	@Override
	public Map<String, Object> coursesRegistedByUserID(int page, int size, String userID) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			param.put("userID", userID);
			List<Course> listTopicResult = sqlSession
					.selectList("com.spring.mapper.CourseMapper.coursesRegistedByUserID", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public int numberUserInCourse(String courseID) {
		SqlSession sqlSession = sqlSessionFactory.openSession();
		int result = 0;
		try {
			result = sqlSession.selectOne("com.spring.mapper.CourseMapper.countNumberUserInCourse", courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	@Override
	public Map<String, Object> getAllCourseByStatutWithPaging(int page, int size, int status) {
		SqlSession sqlSession = this.sqlSessionFactory.openSession();
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();

		try {
			param.put("page", page);
			param.put("size", size);
			param.put("status", status);

			List<Course> listTopicResult = sqlSession
					.selectList("com.spring.mapper.CourseMapper.getAllCourseByStatusWithPaging", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());

		} finally {
			sqlSession.close();
		}

		return result;
	}

	@Override
	public int UpdateConfirmedBy(String courseID, String adminID, LocalDateTime confirmedDate) {
		SqlSession session = this.sqlSessionFactory.openSession();
			int resultOfUpdate = 0;
			Map<String,Object> param  = new HashMap<>();
			try {
				DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
				String confirmedDateToString = confirmedDate.format(dateTimeFormatter);
				
				param.put("courseID",courseID);
				param.put("adminID", adminID);
				param.put("confirmedDate", confirmedDateToString);
	
				resultOfUpdate = session.update("com.spring.mapper.CourseMapper.UpdateConfirmedBy",param);
				
			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}finally {
				session.close();
			}
		return resultOfUpdate;
	}
	@Override
	public Map<String, Object> getAllCourseByAuthorID(int page, int size, String authorID) {
		
		SqlSession sqlSession = this.sqlSessionFactory.openSession();
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		try {
			param.put("page", page);
			param.put("size", size);
			param.put("authorID", authorID);

			List<Course> listTopicResult = sqlSession
					.selectList("com.spring.mapper.CourseMapper.getAllCourseByAuthorID", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listTopicResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);

		} catch (Exception e) {
			LOGGER.error(e.getMessage());

		} finally {
			sqlSession.close();
		}

		return result;
	}
}
