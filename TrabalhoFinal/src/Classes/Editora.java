package Classes;

import java.util.List;

public class Editora extends Dados{
	
	private List<Book> books = BancoDadosLivro.getInstance().getBooks();
	
	public List<Book> getBooks() {
		return books;
	}
	public void setBooks(List<Book> books) {
		this.books = books;
	}
	
}
