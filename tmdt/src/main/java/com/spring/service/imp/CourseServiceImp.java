package com.spring.service.imp;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Course;
import com.spring.domain.custom.Author;
import com.spring.repository.CourseRepository;
import com.spring.service.CourseService;

@Service
public class CourseServiceImp implements CourseService {

	@Autowired
	private CourseRepository courseRepository;

	@Override
	public Optional<Course> getCourseByCourseID(String courseID) {
		return this.courseRepository.getCourseByCourseID(courseID);
	}

	@Override
	public Map<String, Object> getCourseWithPaging(int page, int size) {
		return this.courseRepository.getCourseWithPaging(page, size);
	}

	@Override
	public Map<String, Object> getCourseByTopicIDWithPaging(int page, int size, String TopicID) {
		return this.courseRepository.getCourseByTopicIDWithPaging(page, size, TopicID);
	}

	@Override
	public int updateCourseStatut(String courseID, int newStatut) {
		return this.courseRepository.updateCourseStatus(courseID, newStatut);
	}

	@Override
	public boolean isCourseAuthor(String accountID, String courseID) {
		Optional<Course> course = this.getCourseByCourseID(courseID);
		if (course.isPresent()) {
			if (course.get().getAuthor().getUserID().equals(accountID)) {
				return true;
			}
		}
		return false;
	}

	@Override
	public String createCourse(String courseTitle, String courseDescription, String author, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail) {
		return this.courseRepository.createCourse(courseTitle, courseDescription, author, price, courseTypeID, topicID,
				courseAvatar, courseDetail);
	}

	@Override
	public int updateCourse(String courseID, String courseTitle, String courseDescription, Integer price,
			String courseTypeID, String topicID, String courseAvatar, String courseDetail, Integer newStatus) {
		return this.courseRepository.updateCourse(courseID, courseTitle, courseDescription, price, courseTypeID,
				topicID, courseAvatar, courseDetail, newStatus);
	}

	@Override
	public Map<String, Object> getRelateCourse(int page, int size, String courseID) {
		return this.courseRepository.getRelateCourse(page, size, courseID);
	}

	@Override
	public Optional<Author> getAuthorInfo(String authorID) {
		return this.courseRepository.getAuthorInfo(authorID);
	}

	@Override
	public List<Course> getCourseByAuthorIDSortByView(String authorID, String sortType, int limitRecord) {
		return this.courseRepository.getCourseByAuthorIDSortByView(authorID, sortType, limitRecord);

	}

	@Override
	public Map<String, Object> getAllCourseAuthorIdWithSortAndPaging(int page, int size, String authorID,
			String sortPropertie) {
		return this.courseRepository.getAllCourseAuthorIdWithSortAndPaging(page, size, authorID, sortPropertie);
	}

	@Override
	public boolean isRegisteredCourse(String userID, String courseID) {
		return this.courseRepository.isRegisteredCourse(userID, courseID);
	}

	@Override
	public Map<String, Object> getListCoursesFeatured(int page, int size) {
		return this.courseRepository.getListCoursesFeatured(page, size);
	}

	@Override
	public int addViewForCourse(int views, String courseID) {
		Optional<Course> course = this.courseRepository.getCourseByCourseID(courseID);
		int oldView = course.get().getViews();
		return this.courseRepository.updateViewForCourse(oldView + views, courseID);
	}

	public Map<String, Object> searchByCourseName(int page, int size, String keySearch) {
		return this.courseRepository.searchByCourseName(page, size, keySearch);
	}

	@Override
	public void updateViewByCourseID(String courseID) {
		this.courseRepository.updateViewByCourseID(courseID);
	}

	@Override
	public Optional<Course> getCourseByLessonID(String lessonID) {
		return this.courseRepository.getCourseByLessonID(lessonID);
	}

	@Override
	public Map<String, Object> coursesRegistedByUserID(int page, int size, String userID) {
		return this.courseRepository.coursesRegistedByUserID(page, size, userID);
	}

	@Override
	public int numberUserInCourse(String courseID) {
		return this.courseRepository.numberUserInCourse(courseID);
	}

	@Override
	public Map<String, Object> getAllCourseByStatutWithPaging(int page, int size, int status) {
		return this.courseRepository.getAllCourseByStatutWithPaging(page, size, status);
	}

	@Override
	public int updateCourseStatusForAdmin(String AdminID, String courseID, int newStatus) {
		int resultOfUpdate = this.courseRepository.updateCourseStatus(courseID, newStatus);
		if (resultOfUpdate <= 0) {
			return 0;
		} else {
			this.courseRepository.UpdateConfirmedBy(courseID, AdminID, LocalDateTime.now());
			return resultOfUpdate;
		}
	}

	@Override
	public Map<String, Object> getAllCourseByAuthorID(int page, int size, String authorID) {
		return this.courseRepository.getAllCourseByAuthorID(page, size, authorID);
	}

}
