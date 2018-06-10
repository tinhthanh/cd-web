package com.spring.controller.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.Course;
import com.spring.domain.Lesson;
import com.spring.domain.TransactionHistory;
import com.spring.domain.User;
import com.spring.domain.json.CourseRegisterInfo;
import com.spring.domain.json.PaymentDonate;
import com.spring.service.CourseService;
import com.spring.service.LessonService;
import com.spring.service.PaymentService;
import com.spring.service.TransactionHistoryService;
import com.spring.service.UserService;

@RestController
public class PaymentRest {
	@Autowired
	private PaymentService paymentService;
	@Autowired
	private UserService userService;
	@Autowired
	private JwtTokenUtil tokenHelper;
	@Autowired
	private LessonService lessonService;
	@Autowired
	private TransactionHistoryService transactionHistoryService;
	@Autowired
	private CourseService courseService;

	@RequestMapping(value = "/payment/donate", method = RequestMethod.POST)
	public ResponseEntity<?> donate(@RequestBody PaymentDonate donate, HttpServletRequest request) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		if (donate.getAmount() < 0) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.BAD_REQUEST, "the amount must be greater than 0");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		Optional<Lesson> lesson = this.lessonService.getLessonByLessonID(donate.getLessonID());
		if (!lesson.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "lessonID not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		if (user.getScore() < donate.getAmount()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_ACCEPTABLE,
					"The balance is not enough to make a transaction");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		String transactionHistoryID = paymentService.donate(user.getUserID(), donate.getLessonID(), donate.getAmount());
		Optional<TransactionHistory> th = this.transactionHistoryService
				.getTransactionHistoryByID(transactionHistoryID);

		return new ResponseEntity<Object>(th.get(), HttpStatus.CREATED);
	}

	@RequestMapping(value = "/payment/course/register", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> courseRegister(@RequestBody List<CourseRegisterInfo> registerInfo,
			HttpServletRequest request) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		

		List<Optional<Course>> listCourse = new ArrayList<>();
		for (CourseRegisterInfo r : registerInfo) {
			Optional<Course> course = courseService.getCourseByCourseID(r.getCourseID());
			if (!course.isPresent()) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "course not found");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			} else {
				if(!this.courseService.isRegisteredCourse(user.getUserID(),course.get().getCourseID())) {
					listCourse.add(course);
				}
			}

		}
		double priceForCourseRegister[] = {0};
		listCourse.stream().forEach(l -> {
			priceForCourseRegister[0] += l.get().getPrice();
		});

		if (user.getScore() < priceForCourseRegister[0]) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_ACCEPTABLE,
					"The balance is not enough to make a transaction");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		List<TransactionHistory> listOfTransaction = new ArrayList<>();
		for (CourseRegisterInfo r : registerInfo) {
			String transactionHistoryID = paymentService.courseRegister(user.getUserID(), r.getCourseID());
			Optional<TransactionHistory> th = this.transactionHistoryService.getTransactionHistoryByID(transactionHistoryID);
			listOfTransaction.add(th.get());
		}


		return new ResponseEntity<Object>(listOfTransaction, HttpStatus.CREATED);

	}
	
	@RequestMapping(value = "/payment/course/register/one", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> courseRegister(@RequestBody CourseRegisterInfo registerInfo, HttpServletRequest request) {
		String email = this.tokenHelper.getUsernameFromToken(this.tokenHelper.getToken(request));
		User user = this.userService.getUserByEmail(email);
		Optional<Course> course = courseService.getCourseByCourseID(registerInfo.getCourseID());
		if (!course.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "course not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		if (user.getScore() < course.get().getPrice()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_ACCEPTABLE,
					"The balance is not enough to make a transaction");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		String transactionHistoryID = paymentService.courseRegister(user.getUserID(), registerInfo.getCourseID());

		Optional<TransactionHistory> th = this.transactionHistoryService
				.getTransactionHistoryByID(transactionHistoryID);

		return new ResponseEntity<Object>(th.get(), HttpStatus.CREATED);

	}

}
