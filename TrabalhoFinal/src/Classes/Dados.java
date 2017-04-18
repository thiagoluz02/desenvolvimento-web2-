package Classes;

public abstract class Dados {
	
	private String name;
	private String email;
	private String telefone;
	private String webSite;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getTelefone() {
		return telefone;
	}
	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}
	public String getWebSite() {
		return webSite;
	}
	public void setWebSite(String webSite) {
		this.webSite = webSite;
	}
	
	public void inserirDados (String name, String email, String telefone, String webSite){
		
		this.name = name;
		this.email = email;
		this.telefone = telefone;
		this.webSite = webSite;
		
	}
	
}
