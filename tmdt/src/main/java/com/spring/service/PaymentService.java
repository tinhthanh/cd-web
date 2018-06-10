package com.spring.service;

public interface PaymentService {
	public String courseRegister(String userID, String courseID);

	public String donate(String userID, String lessonID,double amount);

}
