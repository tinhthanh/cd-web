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

import com.spring.domain.Comment;
import com.spring.repository.CommentRepository;

@Repository
public class CommentRepositoryImp implements CommentRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(CommentRepositoryImp.class);
	@Autowired
	private SqlSessionFactory sessionFactory;

	@Override
	public List<Comment> getCommentByLessonID(String lessonID) {
		List<Comment> result = Collections.emptyList();
		SqlSession session = sessionFactory.openSession();
		try {
			result = session.selectList("com.spring.mapper.CommentMapper.getCommentByLessonID", lessonID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		}
		return result;
	}

	@Override
	public Optional<Comment> getCommentBycommentID(int commentID) {
		Comment comment = new Comment();
		SqlSession session = this.sessionFactory.openSession();
		try {
			comment = session.selectOne("com.spring.mapper.CommentMapper.getCommentBycommentID", commentID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return Optional.ofNullable(comment);
	}

	@Override
	public int deleteCommentByCommentID(int commentID) {
		SqlSession session = this.sessionFactory.openSession();
		int result = 0;
		try {
			result = session.delete("com.spring.mapper.CommentMapper.deleteCommentByCommentID", commentID);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result;
	}

	@Override
	public int updateCommentContent(int commentID, String commentContent) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("commentID", commentID);
		param.put("commentContent", commentContent);
		int resultUpdate = 0;
		try {
			resultUpdate = session.update("com.spring.mapper.CommentMapper.updateCommentContent", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}

		return resultUpdate;
	}


	@Override
	public boolean canEditComment(int commentID, String userID) {
		SqlSession session = this.sessionFactory.openSession();
		Map<String, Object> param = new HashMap<>();
		param.put("commentID", commentID);
		param.put("userID", userID);
		int result = 0 ;
		try {
			 result = session.selectOne("com.spring.mapper.CommentMapper.canEditComment", param);
		} catch (Exception e) {
			LOGGER.error(e.getMessage());
		} finally {
			session.close();
		}
		return result == 1;
	}

}
