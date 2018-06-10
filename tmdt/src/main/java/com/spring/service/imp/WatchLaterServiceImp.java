package com.spring.service.imp;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.domain.WatchLater;
import com.spring.repository.WatchLaterRepository;
import com.spring.service.WatchLaterService;

@Service
public class WatchLaterServiceImp implements WatchLaterService {
	@Autowired
	private WatchLaterRepository watchLaterRepository;

	@Override
	public List<WatchLater> getWatchLaterByUserID(String userID) {
		return this.watchLaterRepository.getWatchLaterByUserID(userID);
	}

	@Override
	public Optional<WatchLater> getWatchLaterByUserIDAndCourseID(String userID, String courseID) {
		return this.watchLaterRepository.getWatchLaterByUserIDAndCourseID(userID, courseID);
	}

	@Override
	public int deleteWatchLater(String userID, String courseID) {
		return this.watchLaterRepository.deleteWatchLater(userID, courseID);
	}

	@Override
	public int insertWatchLater(String userID, String courseID) {
		return this.watchLaterRepository.insertWatchLater(userID, courseID);
	}

}
