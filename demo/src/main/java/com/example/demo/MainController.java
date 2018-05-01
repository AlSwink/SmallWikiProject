package com.example.demo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.Article;
import com.example.demo.ArticleRepository;
import com.example.demo.RequestWrapper;

@Controller
@RequestMapping(path="/demo")
public class MainController {
	@Autowired
	private ArticleRepository articleRepository;
	
	@CrossOrigin
	@GetMapping("{id}")
	public @ResponseBody Optional<Article> getArticle(@PathVariable Integer id) {
		//Article article = new Article();
		return articleRepository.findById(id);
	}
	
	@CrossOrigin
	@PostMapping("new")
	public @ResponseBody Optional<Article> newArticle(@RequestBody RequestWrapper request){
		Article article = new Article();
		Long count = 1 + articleRepository.count();
		article.setId(count.intValue());
		article.setCategory(request.getCategory());
		article.setTitle(request.getTitle());
		article.setArticle(request.getArticle());
		article.setTags(request.getTags());
		articleRepository.save(article);
		return articleRepository.findById(article.getId());
	}
	
	@CrossOrigin
	@PostMapping("{id}/edit")
	public @ResponseBody Optional<Article> editArticle(@PathVariable Integer id, @RequestBody RequestWrapper request){
		Article article = new Article();
		article.setId(id);
		article.setCategory(request.getCategory());
		article.setTitle(request.getTitle());
		article.setArticle(request.getArticle());
		article.setTags(request.getTags());
		articleRepository.save(article);
		return articleRepository.findById(id);
	}
	
	@CrossOrigin
	@GetMapping("search/tag/{tag}")
	public @ResponseBody List<Article> getByTag(@PathVariable String tag){
		return articleRepository.findByTagsContainingIgnoreCase(tag);
	}
	
	@CrossOrigin
	@GetMapping("search/title/{title}")
	public @ResponseBody List<Article> getByTitle(@PathVariable String title){
		return articleRepository.findByTitleContainingIgnoreCase(title);
	}
	
	@CrossOrigin
	@GetMapping("search/category/{category}")
	public @ResponseBody List<Article> getByCategory(@PathVariable String category){
		return articleRepository.findByCategoryContainingIgnoreCase(category);
	}
	
	@CrossOrigin
	@GetMapping("hello")
	public @ResponseBody String greet() {
		return "Hello from the other side";
	}
}
