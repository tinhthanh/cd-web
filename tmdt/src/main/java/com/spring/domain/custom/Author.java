package com.spring.domain.custom;

import java.time.LocalDateTime;

public class Author {
	private String userID;
	private String userName;
	private LocalDateTime registrationDate;
	private String email;
	private String avatar;
	private Double score;
	private String address;
	private String phoneNumber;
	private int numberOfCourses;
	public Author(String userID, String userName, LocalDateTime registrationDate, String email, String avatar,
			Double score, String address, String phoneNumber, int numberOfCourses) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.registrationDate = registrationDate;
		this.email = email;
		this.avatar = avatar;
		this.score = score;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.numberOfCourses = numberOfCourses;
	}
	public Author() {
		super();
	}
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public LocalDateTime getRegistrationDate() {
		return registrationDate;
	}
	public void setRegistrationDate(LocalDateTime registrationDate) {
		this.registrationDate = registrationDate;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public Double getScore() {
		return score;
	}
	public void setScore(Double score) {
		this.score = score;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public int getNumberOfCourses() {
		return numberOfCourses;
	}
	public void setNumberOfCourses(int numberOfCourses) {
		this.numberOfCourses = numberOfCourses;
	}
	@Override
	public String toString() {
		return "Author [userID=" + userID + ", userName=" + userName + ", registrationDate=" + registrationDate
				+ ", email=" + email + ", avatar=" + avatar + ", score=" + score + ", address=" + address
				+ ", phoneNumber=" + phoneNumber + ", numberOfCourses=" + numberOfCourses + "]";
	}
	

}
