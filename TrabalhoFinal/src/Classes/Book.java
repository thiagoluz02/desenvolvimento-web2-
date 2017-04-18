package Classes;

import java.util.List;

public class Book{
	
	private String titulo;
	private int id;
	private int page;
	private int anoPublicacao;
	private int edicao;
	private List<Chapter> chapters;
	
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getAnoPublicacao() {
		return anoPublicacao;
	}
	public void setAnoPublicacao(int anoPublicacao) {
		this.anoPublicacao = anoPublicacao;
	}
	public int getEdicao() {
		return edicao;
	}
	public void setEdicao(int edicao) {
		this.edicao = edicao;
	}
	public List<Chapter> getChapters() {
		return chapters;
	}
	public void setChapters(List<Chapter> chapters) {
		this.chapters = chapters;
	}
	
	public void inserirBook (String titulo, int id, int page, int anoPublicacao, int edicao, List chapters){
		
		this.titulo = titulo;
		this.id = id;
		this.page = page;
		this.anoPublicacao = anoPublicacao;
		this.edicao = edicao;
		this.chapters = chapters;
	}
	
}
