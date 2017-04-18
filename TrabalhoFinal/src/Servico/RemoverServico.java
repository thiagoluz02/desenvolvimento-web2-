package Servico;

import java.util.List;
import java.util.Scanner;

import Classes.BancoDadosLivro;
import Classes.Book;


public class RemoverServico {
	
	public void ecluirBook(){
		
		Scanner ler = new Scanner(System.in);
		List<Book> books = BancoDadosLivro.getInstance().getBooks();
		
		String titulo;
				
		System.out.println("Digite o titulo do livro:");
		titulo = ler.next();
		
	    for(int i = 0; i < books.size(); i++){
	    	
	    	Book livro = books.get(i);
	    	
	    	 if(livro.getTitulo().equals(titulo)){

	            books.remove(titulo);
	            
	            break;
	        }
	    }
		
	}
	
}
