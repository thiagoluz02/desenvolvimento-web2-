package Executor;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import Classes.Book;
import Classes.Editora;
import Servico.ImpressaoServico;
import Servico.InserirSerivco;
import Servico.RemoverServico;

public class Main {

	public static void main(String[] args) throws IOException {
				
		int opcaoDigita = 99;
		Scanner ler = new Scanner(System.in);
		Editora editora = new Editora();
		ImpressaoServico servico = new ImpressaoServico();
		InserirSerivco inserir = new InserirSerivco();	
		RemoverServico remove = new RemoverServico();
		
		servico.exibirMenu();
		opcaoDigita = ler.nextInt();
		
		while (opcaoDigita != 0){
			
			switch (opcaoDigita){
			
			case 1:
				inserir.adicionaBook();			
				servico.exibirMenu();
				opcaoDigita = ler.nextInt();
				break;
				
			case 2:
				servico.exluirBook(editora);
				remove.ecluirBook();
				servico.exibirMenu();
				opcaoDigita = ler.nextInt();
				break;
				
			case 3:
				servico.exibirBook(editora);
				servico.exibirMenu();
				opcaoDigita = ler.nextInt();
				break;
				
			default:
				System.out.println("Opção invalida");
				servico.exibirMenu();
				opcaoDigita = ler.nextInt();
				break;
			}	
		}
		
		System.out.println("Programa finalizado");
	}

}
