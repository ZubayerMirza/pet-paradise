-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema pet_social_media
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema pet_social_media
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `pet_social_media` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `pet_social_media` ;

-- -----------------------------------------------------
-- Table `pet_social_media`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `profile_picture_url` VARCHAR(400) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `location` VARCHAR(200) NULL DEFAULT NULL,
  `gender` VARCHAR(45) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  `interests` TEXT NULL DEFAULT NULL,
  `bio` TEXT NULL DEFAULT NULL,
  `school` VARCHAR(255) NULL DEFAULT NULL,
  `cover_picture` VARCHAR(400) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`posts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`posts` (
  `post_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `image_url` VARCHAR(255) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `posts_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 57
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`comments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`comments` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content` TEXT NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `comments_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `pet_social_media`.`posts` (`post_id`),
  CONSTRAINT `comments_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 12
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`friendships`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`friendships` (
  `friendship_id` INT NOT NULL AUTO_INCREMENT,
  `followed_user` INT NOT NULL,
  `following_user` INT NOT NULL,
  `status` VARCHAR(255) NULL DEFAULT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`friendship_id`),
  INDEX `friendships_ibfk_1` (`followed_user` ASC) VISIBLE,
  INDEX `friendships_ibfk_2` (`following_user` ASC) VISIBLE,
  CONSTRAINT `friendships_ibfk_1`
    FOREIGN KEY (`followed_user`)
    REFERENCES `pet_social_media`.`users` (`user_id`),
  CONSTRAINT `friendships_ibfk_2`
    FOREIGN KEY (`following_user`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`likes` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `post_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  INDEX `post_id` (`post_id` ASC) VISIBLE,
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `likes_ibfk_1`
    FOREIGN KEY (`post_id`)
    REFERENCES `pet_social_media`.`posts` (`post_id`),
  CONSTRAINT `likes_ibfk_2`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`messages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`messages` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `recipient_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `read_status` TINYINT(1) NULL DEFAULT '0',
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  INDEX `sender_id` (`sender_id` ASC) VISIBLE,
  INDEX `recipient_id` (`recipient_id` ASC) VISIBLE,
  CONSTRAINT `messages_ibfk_1`
    FOREIGN KEY (`sender_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`),
  CONSTRAINT `messages_ibfk_2`
    FOREIGN KEY (`recipient_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`notifications`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`notifications` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `source_id` INT NOT NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `seen_status` TINYINT(1) NULL DEFAULT '0',
  PRIMARY KEY (`notification_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `notifications_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`petprofiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`petprofiles` (
  `pet_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `pet_name` VARCHAR(255) NOT NULL,
  `pet_type` VARCHAR(255) NOT NULL,
  `affection_level` INT NULL DEFAULT '0',
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pet_id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `petprofiles_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`profile` (
  `user_id` INT NOT NULL,
  `username` VARCHAR(255) NULL DEFAULT NULL,
  `profile_picture` VARCHAR(255) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  `interests` TEXT NULL DEFAULT NULL,
  `bio` TEXT NULL DEFAULT NULL,
  `gender` ENUM('male', 'female', 'other') NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `profile_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `pet_social_media`.`user_stats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `pet_social_media`.`user_stats` (
  `user_id` INT NOT NULL,
  `postCount` INT NULL DEFAULT '0',
  `commentCount` INT NULL DEFAULT '0',
  `likeCount` INT NULL DEFAULT '0',
  `friendCount` INT NULL DEFAULT '0',
  `shareCount` INT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  CONSTRAINT `user_stats_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `pet_social_media`.`users` (`user_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
