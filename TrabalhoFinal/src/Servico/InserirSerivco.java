package Servico;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import Classes.BancoDadosLivro;
import Classes.Book;
import Classes.Chapter;
import Classes.Editora;

public class InserirSerivco {
	
	
	
	public void adicionaBook() throws IOException {
		
		Scanner ler = new Scanner(System.in);
		BancoDadosLivro.getInstance().getBooks();
		
		List<Book> books = BancoDadosLivro.getInstance().getBooks();
		List<Chapter>chapters = new ArrayList<>();
		
		String tituloBook, tituloChapter;
		int id, numberPageBook, anoPublicacao, edicao, inicioPage, fimPage, numberPageChapter;
		char controle = 's';
		
		Editora editora = new Editora();
		Book book = new Book();
		
		System.out.println("Informe o titulo do livro:");
		tituloBook = ler.next();
		System.out.println("Informe o identificador do livro");
		id = ler.nextInt();
		System.out.println("Informe o numero de paginas");
		numberPageBook = ler.nextInt();
		System.out.println("Informe o ano de publicação:");
		anoPublicacao = ler.nextInt();
		System.out.println("Informe a edição");
		edicao = ler.nextInt();
		System.out.println("");
		
		System.out.println("----Inserir Capitulos----");
			while (controle=='s'){
				Chapter chapter = new Chapter();
				System.out.println("Titulo do capitulo:");
				tituloChapter = ler.next();
				System.out.println("Informe o inicio do capitulo");
				inicioPage = ler.nextInt();
				System.out.println("Informe o fim do capitulo");
				fimPage = ler.nextInt();
				System.out.println("Numero de paginas do capitulo");
				numberPageChapter = ler.nextInt();
				System.out.println("Deseja inserir um novo capituo");
				chapter.inserirChaoter(tituloChapter, inicioPage, fimPage, numberPageChapter);
				chapters.add(chapter);
				System.out.println("Sim = s / Não = n");
				controle = (char)System.in.read();;
			}
		book.inserirBook(tituloBook, id, numberPageBook, anoPublicacao, edicao, chapters);
		books.add(book);
		editora.setBooks(books);
		System.out.println("Livro cadastrado com sucesso");
	}
	
}
