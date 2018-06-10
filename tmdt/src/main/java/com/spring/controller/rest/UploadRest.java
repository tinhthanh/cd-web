package com.spring.controller.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.services.drive.model.File;
import com.spring.config.api.ApiMessage;
import com.spring.service.GoogleDriveApiService;

@RestController
public class UploadRest {
	@Autowired
	private GoogleDriveApiService googleDriveApiService;
	@Autowired
	private ServletContext context;
	@Value("${google.folder_id}")
	private String folderId;

	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	public ResponseEntity<?> uploadingPost(@RequestParam("file") List<MultipartFile> listFile) {
	List<Map<String, Object>> result = new ArrayList<>();
		try {
			for (MultipartFile f : listFile) {
				Map<String, Object> temp = new HashMap<>();
				String uploadFolder = this.context.getRealPath("/") + java.io.File.separator;
				java.io.File file = new java.io.File(uploadFolder + f.getOriginalFilename());
				f.transferTo(file);
				File fileUpload = googleDriveApiService.upLoadFile(file.getName(), file.getPath(), this.folderId,
						f.getContentType());
				temp.put("fileProperties", fileUpload.toPrettyString());
				result.add(temp);
				file.delete();
			}
		} catch (Exception e) {
			ApiMessage apiMessage = new ApiMessage(HttpStatus.CONFLICT, e.getMessage());
			return new ResponseEntity<Object>(apiMessage, apiMessage.getStatus());
		}
		return new ResponseEntity<Object>(result, HttpStatus.OK);
	}
}
