package com.spring.service.imp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.Course;
import com.spring.service.CourseRegisterSerivce;
import com.spring.service.CourseService;
import com.spring.service.LessonService;
import com.spring.service.PaymentService;
import com.spring.service.TransactionHistoryService;
import com.spring.service.UserService;

@Service
public class PaymentServiceImp implements PaymentService {

	private static final Logger LOGGER = LoggerFactory.getLogger(PaymentServiceImp.class);

	@Autowired
	private CourseRegisterSerivce courseRegisterSerivce;
	@Autowired
	private CourseService courseService;
	@Autowired
	private UserService userService;
	@Autowired
	TransactionHistoryService transactionHistoryService;
	@Autowired
	private LessonService lessonService;

	@Override
	public String courseRegister(String userID, String courseID) {
		String transactionHistoryID = null;
		try {
			Course course = this.courseService.getCourseByCourseID(courseID).get();
			this.userService.addScore(userID, -course.getPrice());
			this.userService.addScore(course.getAuthor().getUserID(), course.getPrice());
			this.courseRegisterSerivce.createCourseRegister(courseID, userID);
			transactionHistoryID = transactionHistoryService.inserTransactionHistory("MKH", course.getPrice(), 0,
					userID, courseID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}

		return transactionHistoryID;
	}

	@Override
	public String donate(String userID, String lessonID, double amount) {
		String transactionHistoryID = null;
		try {
			Course course = this.courseService.getCourseByCourseID(this.lessonService.getCourseIDByLessonID(lessonID))
					.get();
			this.userService.addScore(userID, -amount);
			this.userService.addScore(course.getAuthor().getUserID(), amount);
			transactionHistoryID = transactionHistoryService.inserTransactionHistory("DN", amount, 0, userID, lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return transactionHistoryID;
	}

}
