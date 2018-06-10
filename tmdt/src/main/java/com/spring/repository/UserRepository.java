package com.spring.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.spring.domain.User;
import com.spring.domain.custom.UserInfo;

public interface UserRepository {
	public User getUserByUserID(String userID);

	public LocalDateTime getLastPasswordResetDate(String userID);

	public User getUserByEmail(String email);

	public int CreateUser(String userName, String email, String password);
	
	public int changeUserStatus(String userID, int newStatus);
	
	public int changeUserPassword(String userID,String newPassword);
	
	public int saveKeyReset(String userID,String keyReset);
	
	public int removeKeyReset(String userID,String keyReset);
	
	public List<String>getKeYResetByUserId(String userID);
	
	public Optional<UserInfo> getUserInfo(String userID);
	
	public int updateScore(String userID,double score);
	
	public Map<String, Object>getListUserInfo(int page,int size);
	
	public int updateUserInfo(String column,Object value,String userID);
	
	public int updateUserInfo(String userName,String avatar,String address,String phoneNumber,String userID);

	public Map<String, Object> getUserWithPaging(int page, int size);

}
