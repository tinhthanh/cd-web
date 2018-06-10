package com.spring.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.service.StatisticsService;

@RestController
@RequestMapping(value="/statistics")
public class StatisticsRest {
	
//	private static final Logger LOGGER = LoggerFactory.getLogger(StatisticsRest.class);
	@Autowired
	private StatisticsService statisticsService;
	
	/** 
	 * statisticsByTopic
	 * @param rowsLimit
	 * @return List<Statistics>, totalCourseOfTopicList 
	 */
	@RequestMapping(value="/topic", method = RequestMethod.GET, params={ "rowsLimit" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> statisticsByTopic(@RequestParam("rowsLimit") int rowsLimit) {
		Map<String, Object> result = this.statisticsService.statisticsByTopic(rowsLimit);
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	/** 
	 * statisticsByCouse
	 * @param rowsLimit
	 * @return List<Statistics>, totalViewOfCourseList
	 */
	@RequestMapping(value="/course", method = RequestMethod.GET, params={ "rowsLimit" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> statisticsByCouse(@RequestParam("rowsLimit") int rowsLimit) {
		Map<String, Object> result = this.statisticsService.statisticsByCourse(rowsLimit);
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
}
