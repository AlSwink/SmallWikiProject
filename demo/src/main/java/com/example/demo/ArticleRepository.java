package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.example.demo.Article;

public interface ArticleRepository extends CrudRepository<Article, Integer> {

	Optional<Article> findByTitle(String title);
	
	//@Query("SELECT a FROM Article a WHERE UPPER(a.tags) LIKE CONCAT('%',UPPER(:tag),'%'")@Param("tag")
	List<Article> findByTagsContainingIgnoreCase(String tag);

	List<Article> findByTitleContainingIgnoreCase(String title);

	List<Article> findByCategoryContainingIgnoreCase(String category);
}
