package com.spring.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.Course;
import com.spring.domain.custom.Author;

public interface CourseRepository {
	public Optional<Course> getCourseByCourseID(String courseID);

	public Map<String, Object> getCourseWithPaging(int page, int size);

	public Map<String, Object> getCourseByTopicIDWithPaging(int page, int size, String TopicID);

	public int updateCourseStatus(String courseID, int newStatus);

	public String createCourse(String courseTitle, String courseDescription, String author, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail);

	public int updateCourse(String courseID, String courseTitle, String courseDescription, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail, Integer newStatus);

	public Map<String, Object> getRelateCourse(int page, int size, String courseID);

	public Optional<Author> getAuthorInfo(String authorID);

	public List<Course> getCourseByAuthorIDSortByView(String authorID, String sortType, int limitRecord);

	public Map<String, Object> getAllCourseAuthorIdWithSortAndPaging(int page, int size, String authorID,
			String sortPropertie);

	public boolean isRegisteredCourse(String userID, String courseID);

	public Map<String, Object> getListCoursesFeatured(int page, int size);

	public Map<String, Object> searchByCourseName(int page, int size, String keySearch);

	public void updateViewByCourseID(String courseID);

	public Optional<Course> getCourseByLessonID(String lessonID);

	public int updateViewForCourse(int view,String courseID);

	public Map<String, Object> coursesRegistedByUserID(int page, int size, String userID);

	public int numberUserInCourse(String courseID);
	
	public Map<String, Object>getAllCourseByStatutWithPaging(int page, int size,int status);
	
	
	
	
	public int UpdateConfirmedBy(String courseID,String adminID,LocalDateTime confirmedDate);
	
	public Map<String, Object> getAllCourseByAuthorID(int page, int size, String authorID);



}
