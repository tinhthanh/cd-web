package com.spring.repository.imp;

import java.util.Collections;
import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.domain.Role;
import com.spring.repository.RoleRepository;
@Repository
public class RoleRepositoryImp implements RoleRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(RoleRepositoryImp.class);

	@Autowired
	SqlSessionFactory sqlSessionFactory;

	@Override
	public List<Role> getListRoleByUserID(String userID) {
		SqlSession session = sqlSessionFactory.openSession();
		List<Role> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.RoleMapper.getListRoleByUserID", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

}
