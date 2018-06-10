package com.spring.controller.rest;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.repository.ReportRepository;

@RestController
public class ReportRest {
	@Autowired
	private ReportRepository reportRepository;

	@RequestMapping(value = "/admin/report/get-data-report-toppic/{rowsLimit}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getDataReportTopic(@PathVariable("rowsLimit") int rowsLimit) {
		try {
			Map<String, Object> list = this.reportRepository.statisticsByTopic(rowsLimit);
			return new ResponseEntity<Object>(list, HttpStatus.OK);
		} catch (Exception e) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.UNPROCESSABLE_ENTITY, "get data report toppic failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
	}

	@RequestMapping(value = "/admin/report/statistics-by-guest/{rowsLimit}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getDataReportGuest(@PathVariable("rowsLimit") int rowsLimit) {
		try {
			Map<String, Object> list = this.reportRepository.statisticsByGuest(rowsLimit);
			return new ResponseEntity<Object>(list, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			ApiMessage apiMessage = new ApiMessage(HttpStatus.UNPROCESSABLE_ENTITY, "get data report toppic failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
	}

	@RequestMapping(value = "/admin/report/statistics-by-cource/{rowsLimit}", method = RequestMethod.GET)
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getDataReportCource(@PathVariable("rowsLimit") int rowsLimit) {
		try {
			Map<String, Object> list = this.reportRepository.statisticsByCource(rowsLimit);
			return new ResponseEntity<Object>(list, HttpStatus.OK);
		} catch (Exception e) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.UNPROCESSABLE_ENTITY, "get data report toppic failed");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
	}
}
