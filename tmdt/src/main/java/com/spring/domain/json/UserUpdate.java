package com.spring.domain.json;

import java.util.List;

import com.spring.domain.Role;

public class UserUpdate {
	private String userID;
	private String userName;
	private String avatar;
	private Integer score;
	private Integer status;
	private String address;
	private String phoneNumber;
	private List<Role> permission;
	public UserUpdate() {
		super();
	}
	public UserUpdate(String userID, String userName, String avatar, Integer score, Integer status, String address,
			String phoneNumber, List<Role> permission) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.avatar = avatar;
		this.score = score;
		this.status = status;
		this.address = address;
		this.phoneNumber = phoneNumber;
		this.permission = permission;
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
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
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
	public List<Role> getPermission() {
		return permission;
	}
	public void setPermission(List<Role> permission) {
		this.permission = permission;
	}
	@Override
	public String toString() {
		final int maxLen = 10;
		return "UserUpdate [userID=" + userID + ", userName=" + userName + ", avatar=" + avatar + ", score=" + score
				+ ", status=" + status + ", address=" + address + ", phoneNumber=" + phoneNumber + ", permission="
				+ (permission != null ? permission.subList(0, Math.min(permission.size(), maxLen)) : null) + "]";
	}
	
}
