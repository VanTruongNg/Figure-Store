package com.JewelleryStore.main.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class FileStorageService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileExtension = fileName.substring(fileName.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + fileExtension;

        Path uploadPath = Paths.get(uploadDir);
        Files.createDirectories(uploadPath);

        try{
            Path filePath = uploadPath.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath);
            return newFileName;
        }catch (IOException ex) {
            throw new IOException("Không thể lưu trữ file " + newFileName + ". Vui lòng thử lại!", ex);
        }
    }
}
