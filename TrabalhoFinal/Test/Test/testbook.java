package Test;

import static org.junit.Assert.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.junit.BeforeClass;
import org.junit.Test;

import Classes.BancoDadosLivro;
import Classes.Book;
import Classes.Chapter;

public class testbook {


	private Book book;
	
	@Before
	public void adicionarbook(){
		
		List<Book> books = BancoDadosLivro.getInstance().getBooks();
		List<Chapter>chapters = new ArrayList<>("Não identificado",	
										 " 200",
										  40,
										  false,
										  20,
										  30,
										  40);
	}
	
	@Test
	public void deveInicializarClasseDentistaComValoresPadrao(){		
		Assert.assertNotNull(dentista);	}
	

}
public void adicionaBook() throws IOException {
	
	Scanner ler = new Scanner(System.in);
	BancoDadosLivro.getInstance().getBooks();
	
	List<Book> books = BancoDadosLivro.getInstance().getBooks();
	List<Chapter>chapters = new ArrayList<>();
	
	String tituloBook, tituloChapter;
	int id, numberPageBook, anoPublicacao, edicao, inicioPage, fimPage, numberPageChapter;
	char controle = 's';