package com.spring.config.api;

import org.springframework.http.HttpStatus;

public class ApiMessage {
	private HttpStatus status;
	private String message;
	public ApiMessage(HttpStatus status, String message) {
		super();
		this.status = status;
		this.message = message;
	}
	

	public ApiMessage() {
	}

	public HttpStatus getStatus() {
		return status;
	}

	public void setStatus(HttpStatus status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}


}
