package Classes;

import java.util.ArrayList;
import java.util.List;

public class BancoDadosLivro {

	private static List<Book> books;
			
	public List<Book> getBooks() {
		return books;
	}

	public void setBooks(List<Book> books) {
		this.books = books;
	}

	private static BancoDadosLivro instance;

	public static BancoDadosLivro getInstance(){
		if (instance == null){
			instance = new BancoDadosLivro();
			books = new ArrayList<>();
		}
		return instance;
	}
	
	
	
}
