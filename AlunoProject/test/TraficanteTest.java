import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

import org.junit.Assert;
import org.junit.Test;

import com.fundatec.classes.Cliente;
import com.fundatec.classes.Pagodeiro;
import com.fundatec.classes.Traficante;

public class TraficanteTest extends TestBase {

	@Test
	public void deveCalcularSalario(){
		
		final double valorPadrao = 10;
		Traficante zePequeno = new Traficante();
		List<Cliente> clientesTraficante = new ArrayList<>();
		zePequeno.setClientes(clientesTraficante);
		
		for (int i = 0; i < 15; i++) {
		
			Cliente cliente = new Cliente();
			
			if(i == 5 || i == 11 || i == 13){
				cliente.setVipe(false);	
			}else{
				cliente.setVipe(true);
			}
			
			cliente.setValor(valorPadrao);
			
			zePequeno.getClientes().add(cliente);		
		}
		
		double valorSalarioCalculado =  zePequeno.calcularSalario();
		
		Assert.assertEquals(7600D/*valor esperado*/, valorSalarioCalculado);
		
	}
}
