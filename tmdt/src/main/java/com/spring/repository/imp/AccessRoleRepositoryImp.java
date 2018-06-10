package com.spring.repository.imp;

import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.repository.AccessRoleRepository;

@Repository
public class AccessRoleRepositoryImp implements AccessRoleRepository{
	private static final Logger LOGGER = LoggerFactory.getLogger(RoleRepositoryImp.class);

	@Autowired
	SqlSessionFactory sqlSessionFactory;
	
	@Override
	public int addUserRole(String userID) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("result", 0);
			session.insert("com.spring.mapper.AccessRoleMapper.addUserRole", param);
			result = (int) param.get("result");
		}catch (Exception e) {
			LOGGER.error(e.getMessage());
		}finally {
			session.close();
		}
		return result;
	}

	@Override
	public int removeUserRole(String userID) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("result", 0);
			session.delete("com.spring.mapper.AccessRoleMapper.removeUserRole", param);
			result = (int) param.get("result");
		}catch (Exception e) {
			LOGGER.error(e.getMessage());
		}finally {
			session.close();
		}
		return result;
	}
	
}
