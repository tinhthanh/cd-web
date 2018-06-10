package com.spring.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.Course;
import com.spring.domain.custom.Author;

public interface CourseService {
	public Optional<Course> getCourseByCourseID(String courseID);

	/**
	 * get topic with paging parameter
	 * 
	 * @param page
	 *            current page begin with 1
	 * @param size
	 *            number of record per page
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object> getCourseWithPaging(int page, int size);

	/**
	 * get course by topic id with paging
	 * 
	 * @param page
	 * @param size
	 * @param TopicID
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object> getCourseByTopicIDWithPaging(int page, int size, String TopicID);

	/**
	 * update course status
	 * 
	 * @param courseID
	 * @param newStatut
	 * @return
	 */
	public int updateCourseStatut(String courseID, int newStatut);

	/**
	 * check user is author of course
	 * 
	 * @param accountID
	 * @param courseID
	 * @return true if is author
	 */
	public boolean isCourseAuthor(String accountID, String courseID);

	/**
	 * create course
	 * 
	 * @param courseTitle
	 * @param courseDescription
	 * @param author
	 *            (userID)
	 * @param price
	 * @param courseTypeID
	 * @param topicID
	 * @param courseAvatar
	 * @param courseDetail
	 * @return CourseID (null if create fail)
	 */
	public String createCourse(String courseTitle, String courseDescription, String author, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail);

	/**
	 * update course
	 * 
	 * @param courseID
	 * @param courseTitle
	 * @param courseDescription
	 * @param price
	 * @param courseTypeID
	 * @param topicID
	 * @param courseAvatar
	 * @param courseDetail
	 * @param newStatus
	 * @return The number of rows affected by the update
	 */
	public int updateCourse(String courseID, String courseTitle, String courseDescription, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail, Integer newStatus);

	/**
	 * get relate course by courseID id with paging
	 * 
	 * @param page
	 * @param size
	 * @param courseID
	 * @return Map<String, Object> with two key (listOfResult, numberOfPage)
	 */
	public Map<String, Object> getRelateCourse(int page, int size, String courseID);

	/**
	 * get author by authorID
	 * 
	 * @param authorID
	 * @return
	 */
	public Optional<Author> getAuthorInfo(String authorID);

	public List<Course> getCourseByAuthorIDSortByView(String authorID, String sortType, int limitRecord);

	public Map<String, Object> getAllCourseAuthorIdWithSortAndPaging(int page, int size, String authorID,
			String sortPropertie);

	public boolean isRegisteredCourse(String userID, String courseID);

	public Map<String, Object> getListCoursesFeatured(int page, int size);


	public int addViewForCourse(int views,String courseID);
	
	public Map<String, Object> searchByCourseName(int page, int size, String keySearch);

	public void updateViewByCourseID(String courseID);

	public Optional<Course> getCourseByLessonID(String lessonID);

	public Map<String, Object> coursesRegistedByUserID(int page, int size, String userID);

	public int numberUserInCourse(String courseID);
	
	public Map<String, Object>getAllCourseByStatutWithPaging(int page, int size,int status);
	
	
	public int updateCourseStatusForAdmin(String AdminID,String courseID,int newStatus);
	
	public Map<String, Object> getAllCourseByAuthorID(int page, int size, String authorID);

	

}
