package com.spring.controller.rest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.Course;
import com.spring.domain.User;
import com.spring.domain.custom.Author;
import com.spring.domain.json.CourseCreate;
import com.spring.domain.json.CourseStatus;
import com.spring.domain.json.CourseUpdate;
import com.spring.service.CourseService;
import com.spring.service.UserService;

@RestController
public class CourseRest {
	@Autowired
	private CourseService courseService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/users/course/{courseID}", method = RequestMethod.GET)
	public ResponseEntity<?> getCourseByID(@PathVariable("courseID") String courseID) {
		Optional<Course> result = courseService.getCourseByCourseID(courseID);
		if (!result.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "cant find course");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		this.courseService.addViewForCourse(1, courseID);
		return new ResponseEntity<Course>(result.get(), HttpStatus.OK);
	}

	@RequestMapping(value = "/users/course", method = RequestMethod.GET, params = { "page", "size" })
	public ResponseEntity<?> getTopic(@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.courseService.getCourseWithPaging(page, size);
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "no course found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/users/course", method = RequestMethod.POST)
	@PreAuthorize("hasRole('ROLE_USER')")
	public ResponseEntity<?> createCourse(@RequestBody CourseCreate courseCreate, HttpServletRequest request) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));

		String CourseIDAfterInsert = this.courseService.createCourse(courseCreate.getCourseTitle(),
				courseCreate.getCourseDescription(), user.getUserID(), courseCreate.getPrice(),
				courseCreate.getCourseTypeID(), courseCreate.getTopicID(), courseCreate.getCourseAvatar(),
				courseCreate.getCourseDetail());

		if (!CourseIDAfterInsert.isEmpty()) {
			Optional<Course> course = this.courseService.getCourseByCourseID(CourseIDAfterInsert);
			return new ResponseEntity<Object>(course.get(), HttpStatus.CREATED);

		}
		ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "create course failed");
		return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
	}

	@RequestMapping(value = "/admin/course/status", method = RequestMethod.PATCH)
	@PreAuthorize("canEditCourse(#courseStatus.courseID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateCourseStatus(@RequestBody CourseStatus courseStatus) {

		Optional<Course> result = courseService.getCourseByCourseID(courseStatus.getCourseID());
		if (!result.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "cant find course");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			if (this.courseService.updateCourseStatut(courseStatus.getCourseID(), courseStatus.getNewStatus()) <= 0) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "update status failed");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			return new ResponseEntity<Course>(this.courseService.getCourseByCourseID(result.get().getCourseID()).get(),
					HttpStatus.OK);

		}

	}

	@RequestMapping(value = "/user/course", method = RequestMethod.PATCH)
	@PreAuthorize("canEditCourse(#courseUpdate.courseID)||hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateCourse(@RequestBody CourseUpdate courseUpdate) {
		if (!this.courseService.getCourseByCourseID(courseUpdate.getCourseID()).isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "course not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			try {
				this.courseService.updateCourse(courseUpdate.getCourseID(), courseUpdate.getCourseTitle(),
						courseUpdate.getCourseDescription(), Integer.valueOf(courseUpdate.getPrice()),
						courseUpdate.getCourseTypeID(), courseUpdate.getTopicID(), courseUpdate.getCourseAvatar(),
						courseUpdate.getCourseDetail(), courseUpdate.getStatus());
			} catch (Exception e) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, e.getMessage());
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
		}
		return new ResponseEntity<Object>(this.courseService.getCourseByCourseID(courseUpdate.getCourseID()).get(),
				HttpStatus.CREATED);

	}

	@RequestMapping(value = "/users/course/{courseID}/relationship", method = RequestMethod.GET, params = { "page",
			"size" })
	public ResponseEntity<?> getCourseRelate(@PathVariable("courseID") String courseID,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.courseService.getRelateCourse(page, size, courseID);

		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no course found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/users/course/author/{authorID}", method = RequestMethod.GET)
	public ResponseEntity<?> getAuthorByAuthorID(@PathVariable("authorID") String authorID) {
		Optional<Author> author = this.courseService.getAuthorInfo(authorID);
		if (!author.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "author not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			return new ResponseEntity<Object>(author.get(), HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/users/course/{authorID}", params = { "sortType", "limitRecord" })
	public ResponseEntity<?> getCourseByAuthorIDSortByView(@PathVariable("authorID") String authorID,
			@RequestParam("sortType") String sortType, @RequestParam("limitRecord") int limitRecord) {
		String sortTypeArray[] = { "desc", "asc" };
		if (!Arrays.asList(sortTypeArray).contains(sortType)) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.BAD_REQUEST, "sort type [desc,asc]");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			if (userService.getUserByUserID(authorID) == null) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "authorID not found");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			List<Course> result = this.courseService.getCourseByAuthorIDSortByView(authorID, sortType, limitRecord);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/users/course/{authorID}", params = { "sortPropertie", "page",
			"size" }, method = RequestMethod.GET)
	public ResponseEntity<?> getAllCourseAuthorIdWithSortAndPaging(@PathVariable("authorID") String authorID,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size,
			@RequestParam(value = "sortPropertie") String sortPropertie) {

		String sortPropertieArr[] = { "courseID", "courseTitle", "courseDescription", "createDate", "price", "views",
				"courseType" };
		if (!Arrays.asList(sortPropertieArr).contains(sortPropertie)) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.BAD_REQUEST,
					"sort type " + Arrays.asList(sortPropertieArr).toString());
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			if (userService.getUserByUserID(authorID) == null) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "authorID not found");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			Map<String, Object> result = this.courseService.getAllCourseAuthorIdWithSortAndPaging(page, size, authorID,
					sortPropertie);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/users/courses-featured", params = { "page", "size" }, method = RequestMethod.GET)
	public ResponseEntity<?> coursesFeatured(
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.courseService.getListCoursesFeatured(page, size);
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no topic found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/user/is-registed/{courseID}", method = RequestMethod.GET)
	public ResponseEntity<?> courseIsRegisted(@PathVariable("courseID") String courseID, HttpServletRequest request) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		Map<String, Object> map = new HashMap<>();
		if (courseService.isRegisteredCourse(user.getUserID(), courseID))
			map.put("success", 1);
		else
			map.put("success", 0);
		return new ResponseEntity<Object>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/users/course/searching/{key_search}", params = { "page",
			"size" }, method = RequestMethod.GET)
	public ResponseEntity<?> searchCourse(@PathVariable("key_search") String keySearch,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.courseService.searchByCourseName(page, size, keySearch);
		int numberOfRecord = Integer.valueOf(String.valueOf(result.get("numberOfRecord")));
		if (numberOfRecord == 0) {
			return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/user/cousrses-registed", params = { "page", "size" }, method = RequestMethod.GET)
	public ResponseEntity<?> coursesRegisted(HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		Map<String, Object> result = this.courseService.coursesRegistedByUserID(page, size, user.getUserID());
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no course found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}

		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/users/count-number-user-in-course/{courseID}", method = RequestMethod.GET)
	public ResponseEntity<?> countNumberUserInCourse(@PathVariable("courseID") String courseID) {
		int numberUserInCourse = this.courseService.numberUserInCourse(courseID);
		Map<String, Integer> map = new HashMap<>();
		map.put("number_user", numberUserInCourse);
		return new ResponseEntity<Object>(map, HttpStatus.OK);
	}

	@RequestMapping(value = "/course/status/{status}", params = { "page", "size" }, method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getAllCourseByStatutWithPaging(@PathVariable("status") int status,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {
		Map<String, Object> result = this.courseService.getAllCourseByStatutWithPaging(page, size, status);

		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/admin/course/status/confirmed", method = RequestMethod.PATCH)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateCourseStatusForAdmin(HttpServletRequest request,
			@RequestBody CourseStatus courseStatus) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));

		Optional<Course> result = courseService.getCourseByCourseID(courseStatus.getCourseID());

		if (!result.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "cant find course");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		} else {
			int resultOfUpdate = this.courseService.updateCourseStatusForAdmin(user.getUserID(),
					courseStatus.getCourseID(), courseStatus.getNewStatus());
			if (resultOfUpdate <= 0) {
				ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, "update status failed");
				return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
			}
			return new ResponseEntity<Course>(this.courseService.getCourseByCourseID(result.get().getCourseID()).get(),
					HttpStatus.OK);
		}
	}

	@RequestMapping(value = "/user/course", params = { "page", "size" }, method = RequestMethod.GET)
	public ResponseEntity<?> getAllCourseByAuthorID(HttpServletRequest request,
			@RequestParam(value = "page", defaultValue = "1", required = false) int page,
			@RequestParam(value = "size", defaultValue = "1", required = false) int size) {

		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		Map<String, Object> result = this.courseService.getAllCourseByAuthorID(page, size, user.getUserID());
		int numberOfRecord = Integer.valueOf(String.valueOf(result.get("numberOfRecord")));
		if (numberOfRecord == 0) {
			return new ResponseEntity<Object>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);

	}

}
