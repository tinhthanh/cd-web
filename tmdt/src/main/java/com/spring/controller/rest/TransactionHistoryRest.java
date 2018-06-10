package com.spring.controller.rest;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.config.api.ApiMessage;
import com.spring.config.security.JwtTokenUtil;
import com.spring.domain.TransactionForm;
import com.spring.domain.TransactionHistory;
import com.spring.domain.User;
import com.spring.service.TransactionHistoryService;
import com.spring.service.UserService;

@RestController
public class TransactionHistoryRest {
	@Autowired
	TransactionHistoryService transactionHistoryService;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/admin/transaction_history", method = RequestMethod.GET, params = { "page", "size" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getAllTransactionHistory(
			@RequestParam(value = "page", defaultValue = "1", required = true) int page,
			@RequestParam(value = "size", defaultValue = "1", required = true) int size) {
		Map<String, Object> result = this.transactionHistoryService.getAllTransactionHistory(page, size);
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no transaction history found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}

	@RequestMapping(value = "/admin/transaction_history/{transactionHistoryID}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getTransactionHistoryByID(
			@PathVariable("transactionHistoryID") String transactionHistoryID) {
		Optional<TransactionHistory> th = this.transactionHistoryService
				.getTransactionHistoryByID(transactionHistoryID);
		if (!th.isPresent()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "transaction history not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(th.get(), HttpStatus.OK);
	}

	@RequestMapping(value = "/user/transaction_history", method = RequestMethod.GET, params = { "page", "size" })
	public ResponseEntity<?> getAllTransactionHistory2(
			@RequestParam(value = "page", defaultValue = "1", required = true) int page,
			@RequestParam(value = "size", defaultValue = "1", required = true) int size, HttpServletRequest request) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		Map<String, Object> result = this.transactionHistoryService.getTransactionHistoryByTraders(page, size,
				user.getUserID());
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no transaction history found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/admin/transaction_history/{userID}", method = RequestMethod.GET, params = { "page", "size" })
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<?> getTransactionHistoryByTraders(@PathVariable("userID") String userID,
			@RequestParam(value = "page", defaultValue = "1", required = true) int page,
			@RequestParam(value = "size", defaultValue = "1", required = true) int size) {
		User user = this.userService.getUserByUserID(userID);
		if (user == null) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "user not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}else {
			Map<String, Object> result = this.transactionHistoryService.getTransactionHistoryByTraders(page, size, userID);
			return new ResponseEntity<Object>(result, HttpStatus.OK);
		}
		
	}
	
	@RequestMapping(value="/users/list-transaction-form", method = RequestMethod.GET)
	public  ResponseEntity<?>  getListTransactionForm(){
		List<TransactionForm>  forms  =  this.transactionHistoryService.getListTransactionForm();
		if (forms.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NOT_FOUND, "Transaction form is not found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return  new ResponseEntity<List<TransactionForm>>(forms, HttpStatus.OK);
	}
	@RequestMapping(value = "/user/transaction_history/{transactionID}", method = RequestMethod.GET, params = { "page", "size" })
	public ResponseEntity<?> getAllTransactionHistory3(
			@RequestParam(value = "page", defaultValue = "1", required = true) int page,
			@RequestParam(value = "size", defaultValue = "1", required = true) int size, HttpServletRequest request,
			@PathVariable("transactionID") String transactionID) {
		String authToken = jwtTokenUtil.getToken(request);
		User user = userService.getUserByEmail(jwtTokenUtil.getUsernameFromToken(authToken));
		Map<String, Object> result = this.transactionHistoryService.getTransactionHistoryByTradersAndTransactionID(page, size,
				user.getUserID(), transactionID);
		if (result.isEmpty()) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.NO_CONTENT, "no transaction history found");
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
	
	
	

}
