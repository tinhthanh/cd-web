package com.spring.service;

import java.util.List;
import java.util.Optional;

import com.spring.domain.WatchLater;

public interface WatchLaterService {
	public List<WatchLater> getWatchLaterByUserID(String userID);

	public Optional<WatchLater> getWatchLaterByUserIDAndCourseID(String userID, String courseID);

	public int deleteWatchLater(String userID, String courseID);

	public int insertWatchLater(String userID, String courseID);
}
