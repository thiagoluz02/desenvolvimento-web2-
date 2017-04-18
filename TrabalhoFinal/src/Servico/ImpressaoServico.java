package Servico;

import Classes.Book;
import Classes.Chapter;
import Classes.Editora;
import Interface.ImpressaoInterface;

public class ImpressaoServico implements ImpressaoInterface{

	@Override
	public void exibirDados() {
		// TODO Auto-generated method stub
		
	}
	
	public void exibirMenu(){
		
		System.out.println("-----MENU-----");
		System.out.println("Opção: 1 - Adiciona Livro");
		System.out.println("Opção: 2 - Remover Livro");
		System.out.println("Opção: 3 - Imprimir Relatorio");
		System.out.println("Opção: 0 - Finalizar Programa");
		System.out.println("Digite a opção desejada");
		System.out.println("");
	}
	
	public void exibirBook(Editora dados){
		System.out.println("Editora--");
		System.out.println(" ------ |Relatório de  livros cadastrados|---------");
		System.out.println("");
				
		for (Book book : dados.getBooks()) {
			System.out.println("Nome do livro: " +  book.getTitulo());
			System.out.println("Identificador do livro: " +  book.getId());
			System.out.println("Número de paginas: " + book.getPage());
			System.out.println("Ano da Publicação: " + book.getAnoPublicacao());
			System.out.println("Edição: " + book.getEdicao());
			System.out.println("");
			
			for (Chapter chapter : book.getChapters()) {
				System.out.println("Nome do capitulo: " + chapter.getTitulo());
				System.out.println("Incio do Capito: " + chapter.getInicioPage());
				System.out.println("Fim do Capito: " + chapter.getFimPage());
				System.out.println("Numero de paginas: " + chapter.getNumber());
				System.out.println("");
			}
			
		}
	}
	public void exluirBook(Editora dados){
						
		for (Book book : dados.getBooks()) {
			System.out.println("Nome do livro: " +  book.getTitulo());
			System.out.println("");
			
		}
	}

}
