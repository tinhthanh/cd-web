package com.spring.service.imp;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.repository.StatisticsRepository;
import com.spring.service.StatisticsService;

@Service
public class StatisticsServiceImp implements StatisticsService{
	
	@Autowired
	private StatisticsRepository statisticsRepository;
	
	@Override
	public Map<String, Object> statisticsByTopic(int rowsLimit) {
		return this.statisticsRepository.statisticsByTopic(rowsLimit);
	}
	@Override
	public Map<String, Object> statisticsByCourse(int rowsLimit) {
		return this.statisticsRepository.statisticsByCourse(rowsLimit);
	}

}
