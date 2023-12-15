package com.domann.bloombox.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

@RestController
@RequestMapping("api/images")
public class ImageController {

    @PostMapping("/upload/{userId}/{type}")
    public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable int userId, @PathVariable String type) throws Exception{
        String dir;
        if (Objects.equals(type, "plant")){
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\plants";
            Files.createDirectories(Paths.get(dir));
        } else if (Objects.equals(type, "location")) {
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\locations";
            Files.createDirectories(Paths.get(dir));
        } else if (Objects.equals(type, "diary")) {
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\diaries";
            Files.createDirectories(Paths.get(dir));
        } else return "not supported type of image";

        Files.copy(file.getInputStream(), Paths.get(dir + File.separator + file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

        return "success";
    }

    @GetMapping("/download/{userId}/{type}/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName, @PathVariable int userId, @PathVariable String type) throws Exception {
        String pathToImg;
        if (Objects.equals(type, "plant")){
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\plants\\" + fileName;
        } else if (Objects.equals(type, "location")) {
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\locations\\" + fileName;
        } else if (Objects.equals(type, "diary")) {
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\diaries\\" + fileName;
        } else return null;

        byte[] image = Files.readAllBytes(new File(pathToImg).toPath());
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }
}
