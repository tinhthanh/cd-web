package com.spring.repository;

import java.util.Map;

public interface StatisticsRepository {
	
	public Map<String, Object> statisticsByTopic(int rowsLimit);
	
	public Map<String, Object> statisticsByCourse(int rowsLimit);
}
