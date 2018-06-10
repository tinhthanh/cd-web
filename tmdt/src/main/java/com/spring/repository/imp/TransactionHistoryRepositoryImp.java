package com.spring.repository.imp;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.spring.domain.TransactionForm;
import com.spring.domain.TransactionHistory;
import com.spring.repository.TransactionHistoryRepository;

@Repository
public class TransactionHistoryRepositoryImp implements TransactionHistoryRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(TransactionHistoryRepositoryImp.class);

	@Autowired
	private SqlSessionFactory sqlSessionFactory;

	@Override
	public Map<String, Object> getAllTransactionHistory(int page, int size) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		try {
			List<TransactionHistory> listCourseResult = session
					.selectList("com.spring.mapper.TransactionHistoryMapper.getAllTransactionHistory", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourseResult);
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
	public Optional<TransactionHistory> getTransactionHistoryByID(String transactionHistoryID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		TransactionHistory transactionHistory = new TransactionHistory();
		try {
			transactionHistory = session.selectOne(
					"com.spring.mapper.TransactionHistoryMapper.getTransactionHistoryByID", transactionHistoryID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(transactionHistory);
	}

	@Override
	public Map<String, Object> getTransactionHistoryByTraders(int page, int size, String userID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		param.put("userID", userID);
		try {
			List<TransactionHistory> listCourseResult = session
					.selectList("com.spring.mapper.TransactionHistoryMapper.getTransactionHistoryByTraders", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourseResult);
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
	public String inserTransactionHistory(String transactionFormID, double debt, double balance, String userID,
			String transactionDescription) {

		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("transactionFormID", transactionFormID);
		param.put("debt", debt);
		param.put("balance", balance);
		param.put("userID", userID);
		param.put("transactionDescription", transactionDescription);
		String result = null;
		try {
			session.insert("com.spring.mapper.TransactionHistoryMapper.inserTransactionHistory", param);
			result = (String) param.get("result");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public List<TransactionForm> getTransactionForm() {
		SqlSession session = this.sqlSessionFactory.openSession();
		List<TransactionForm> transactionForm = Collections.emptyList();
		try {
			transactionForm = session.selectList(
					"com.spring.mapper.TransactionFormMapper.getTransactionForm");
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return  transactionForm;
	}

	@Override
	public Map<String, Object> getTransactionHistoryByTradersAndTransactionID(int page, int size, String userID,
			String transactionID) {
		SqlSession session = this.sqlSessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		Map<String, Object> result = new HashMap<>();
		param.put("page", page);
		param.put("size", size);
		param.put("userID", userID);
		param.put("transactionID", transactionID);
		try {
			List<TransactionHistory> listCourseResult = session
					.selectList("com.spring.mapper.TransactionHistoryMapper.getTransactionHistoryByTradersAndTransactionID", param);
			int numberOfPage = (int) param.get("sumPage");
			int numberOfRecord = (int) param.get("sumRecord");

			result.put("listOfResult", listCourseResult);
			result.put("numberOfPage", numberOfPage);
			result.put("numberOfRecord", numberOfRecord);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result; 
	}
}
