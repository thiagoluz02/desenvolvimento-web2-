package Classes;

public class Chapter {
	
	private String titulo;
	private int inicioPage;
	private int fimPage;
	private int number;
	
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public int getInicioPage() {
		return inicioPage;
	}
	public void setInicioPage(int inicioPage) {
		this.inicioPage = inicioPage;
	}
	public int getFimPage() {
		return fimPage;
	}
	public void setFimPage(int fimPage) {
		this.fimPage = fimPage;
	}
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
	}

	public void inserirChaoter (String titulo, int inicioPage, int fimPage, int number){
		
		this.titulo = titulo;
		this.inicioPage = inicioPage;
		this.fimPage = fimPage;
		this.number = number;
		
	}
	
}
