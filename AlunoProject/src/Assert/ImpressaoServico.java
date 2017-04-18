package Assert;

import com.fundatec.classes.Cliente;
import com.fundatec.classes.Pagodeiro;
import com.fundatec.classes.Traficante;
import com.fundatec.interfaces.ImpressaoInterface;

public class ImpressaoServico implements ImpressaoInterface {

	
	//estou passando como parametro um objeto do tipo Traficante
	
	@Override
	public void exibirDados() {
		// TODO Auto-generated method stub	
	}
	
	public void exibirDados(Traficante profissional) {

		System.out.println(" ------ |Relatório de traficante|---------");
		System.out.println("Salario : " + profissional.getSalario());
		System.out.println("Valor base : " + profissional.getValorBase());
		
		System.out.println("");
		System.out.println(" ------ |Informação do(s) cliente(s)|---------");
		for (Cliente cliente : profissional.getClientes()) {
			
			System.out.println("Valor : " + cliente.getValor());
			System.out.println("Vipe : " + (cliente.getVipe() ? "Sim" : "Não"));
		}
		
	}
	
	
	public void exibirDados(Pagodeiro pagodeiro) {
		// TODO Auto-generated method stub	
	}
	
}
