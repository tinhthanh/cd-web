package com.spring.domain.json;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;

public class UserInfoUpdate {
	private String userID;
	private String userName;
	private String avatar;
	private String address;
	private String phoneNumber;
	public UserInfoUpdate(String userID, String userName, String avatar, String address, String phoneNumber) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.avatar = avatar;
		this.address = address;
		this.phoneNumber = phoneNumber;
	}
	public UserInfoUpdate() {
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
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
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
	@Override
	public String toString() {
		return "UserInfoUpdate [userID=" + userID + ", userName=" + userName + ", avatar=" + avatar + ", address="
				+ address + ", phoneNumber=" + phoneNumber + "]";
	}
	
	public  <T> long getNonNullFieldCount() {
		List<Function<? super UserInfoUpdate, ? extends Object>> functionList = new ArrayList<>();
		functionList.add(UserInfoUpdate::getUserID);
		functionList.add(UserInfoUpdate::getUserName);
		functionList.add(UserInfoUpdate::getAvatar);
		functionList.add(UserInfoUpdate::getPhoneNumber);
	    return functionList.stream().map(f -> f.apply(this)).filter(Objects::nonNull).count();
	}
}
