package com.spring.repository.imp;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.ExecutorType;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.spring.domain.User;
import com.spring.domain.custom.UserInfo;
import com.spring.repository.UserRepository;

@Repository
public class UserRepositoryImp implements UserRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sqlSessionFactory;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public User getUserByUserID(String userID) {

		SqlSession session = sqlSessionFactory.openSession();
		User result = new User();
		try {
			result = session.selectOne("com.spring.mapper.UserMapper.getUserByUserID", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public LocalDateTime getLastPasswordResetDate(String userID) {
		SqlSession session = sqlSessionFactory.openSession();
		LocalDateTime result = null;
		try {
			result = session.selectOne("com.spring.mapper.UserActionMapper.getLastPasswordResetDate", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

	@Override
	public User getUserByEmail(String email) {
		SqlSession session = sqlSessionFactory.openSession();
		User user = new User();
		try {
			user = session.selectOne("com.spring.mapper.UserMapper.getUserByEmail", email);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return user;
	}

	@Override
	public int CreateUser(String userName, String email, String password) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userName", userName);
			param.put("email", email);
			param.put("password", this.passwordEncoder.encode(password));
			param.put("result", 0);
			session.insert("com.spring.mapper.UserMapper.createUser", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

	@Override
	public int changeUserStatus(String userID, int newStatus) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("newStatus", newStatus);
			param.put("result", 0);
			session.insert("com.spring.mapper.UserMapper.changeUserStatus", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result;

	}

	@Override
	public int changeUserPassword(String userID, String newPassword) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("newPassword", newPassword);
			param.put("result", 0);
			session.insert("com.spring.mapper.UserMapper.changeUserPassword", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return result;
	}

	@Override
	public int saveKeyReset(String userID, String keyReset) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("keyReset", keyReset);
			param.put("result", 0);
			session.insert("com.spring.mapper.UserActionMapper.saveKeyReset", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int removeKeyReset(String userID, String keyReset) {
		SqlSession session = sqlSessionFactory.openSession();
		int result = 0;
		try {
			Map<String, Object> param = new HashMap<>();
			param.put("userID", userID);
			param.put("keyReset", keyReset);
			param.put("result", 0);
			session.insert("com.spring.mapper.UserActionMapper.removeKey", param);
			result = (int) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public List<String> getKeYResetByUserId(String userID) {
		SqlSession session = sqlSessionFactory.openSession();
		List<String> result = Collections.emptyList();
		try {
			result = session.selectList("com.spring.mapper.UserActionMapper.getKeYResetByUserId", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public Optional<UserInfo> getUserInfo(String userID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		UserInfo userCustom = new UserInfo();
		try {
			userCustom = session.selectOne("com.spring.mapper.UserMapper.getUserByUserID2", userID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(userCustom);
	}

	@Override
	public Map<String, Object> getUserWithPaging(int page, int size) {
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		SqlSession sqlSession = sqlSessionFactory.openSession();
		try {
			param.put("page", page);
			param.put("size", size);
			List<User> listUserResult = sqlSession.selectList("com.spring.mapper.UserMapper.getUserWithPaging", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");
			result.put("listOfResult", listUserResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			sqlSession.close();
		}
		return result;
	}

	public int updateScore(String userID, double score) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("userID", userID);
		param.put("score", score);
		int resultUpdate = 0;
		try {
			resultUpdate = session.update("com.spring.mapper.UserMapper.updateScore", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return resultUpdate;
	}

	@Override
	public Map<String, Object> getListUserInfo(int page, int size) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> result = new HashMap<>();
		Map<String, Object> param = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		try {
			List<UserInfo> listOfResults = session.selectList("com.spring.mapper.UserMapper.getListUserInfo", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listOfResults);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int updateUserInfo(String column, Object value, String userID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		int result = 0;
		param.put("column", column);
		param.put("value", value);
		param.put("userID", userID);
		try {

			result = session.update("com.spring.mapper.UserMapper.updateUserInfo", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int updateUserInfo(String userName, String avatar, String address, String phoneNumber, String userID) {
		SqlSession session = this.sqlSessionFactory.openSession(ExecutorType.BATCH, false);
		Map<String, Object> param = new HashMap<>();
		Map<String, String> columnName = new HashMap<>();
		int resultUpdate = 0;
		param.put("userName", userName);
		param.put("avatar", avatar);
		param.put("address", address);
		param.put("phoneNumber", phoneNumber);

		columnName.put("userName", "ten_nguoi_dung");
		columnName.put("avatar", "anh_dai_dien");
		columnName.put("address", "dia_chi");
		columnName.put("phoneNumber", "sdt");
		try {
			param.entrySet().removeIf(e -> e.getValue() == null);
			for (Map.Entry<String, Object> p2 : param.entrySet()) {
				Map<String, Object> p = new HashMap<>();
				p.put("column", columnName.get(p2.getKey()));
				p.put("value", p2.getValue());
				p.put("userID", userID);

				resultUpdate += session.update("com.spring.mapper.UserMapper.updateUserInfo", p);
			}

		} catch (Exception e) {
			LOGGER.error(e.getMessage());
			session.rollback();
			session.close();
		}
		if (resultUpdate == (param.size() * -2147482646)) {
			try {
				session.commit();
				session.close();
				return param.size();

			} catch (Exception e) {
				LOGGER.error(e.getMessage());
			}
		}
		session.rollback();
		session.close();
		return 0;

	}
}
