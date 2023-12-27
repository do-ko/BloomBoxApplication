package com.domann.bloombox.rest;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.*;
import java.util.Objects;

import static java.nio.file.Paths.get;

@RestController
@RequestMapping("api/images")
public class ImageController {

    @PostMapping("/upload/{userId}/{type}")
    public String uploadImage(@RequestParam("file") MultipartFile file, @PathVariable int userId, @PathVariable String type) throws Exception{
        String dir;
        if (Objects.equals(type, "plant")){
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\plants";
            Files.createDirectories(get(dir));
        } else if (Objects.equals(type, "location")) {
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\locations";
            Files.createDirectories(get(dir));
        } else if (Objects.equals(type, "diary")) {
            dir = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\diaries";
            Files.createDirectories(get(dir));
        } else return "not supported type of image";

        Files.copy(file.getInputStream(), get(dir + File.separator + file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);

        return "success";
    }

    @GetMapping("/download/{userId}/{type}/{fileName}")
    public ResponseEntity<?> downloadImage(@PathVariable String fileName, @PathVariable int userId, @PathVariable String type) throws Exception {
        String pathToImg;
        if (Objects.equals(type, "plant")){
            if (fileName.equals("defaultPlant.jpg")){
                pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\" + fileName;
            } else {
                pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\plants\\" + fileName;
            }
        } else if (Objects.equals(type, "location")) {
            if (fileName.equals("defaultLocation.jpg")){
                pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\" + fileName;
            } else {
                pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\locations\\" + fileName;
            }
        } else if (Objects.equals(type, "diary")) {
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\diaries\\" + fileName;
        } else {
            System.out.println("Failed");
            return null;
        }

        byte[] image = Files.readAllBytes(new File(pathToImg).toPath());
        System.out.println("Passed");
        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(image);
    }

    @DeleteMapping("/delete/{userId}/{type}/{fileName}")
    public String deleteImage(@PathVariable String fileName, @PathVariable int userId, @PathVariable String type){
        String pathToImg;

        if (Objects.equals(type, "plant")){
            if (fileName.equals("defaultPlant.jpg")){
                return "Default file is not supposed to be deleted.";
            } else {
                pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\plants\\" + fileName;
            }
        } else if (Objects.equals(type, "location")) {
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\locations\\" + fileName;
        } else if (Objects.equals(type, "diary")) {
            pathToImg = "bloombox\\src\\main\\java\\com\\domann\\bloombox\\images\\user_" + userId + "\\diaries\\" + fileName;
        } else {
            return "Failed to delete image - path cant be found";
        }

        File file = new File(pathToImg);
        if (file.delete()){
            return "Image was deleted";
        } else return "Failed to delete image";
    }
}
