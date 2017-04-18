package com.fundatec.main;

import java.util.ArrayList;
import java.util.List;

import com.fundatec.classes.Cliente;
import com.fundatec.classes.Traficante;

import Assert.ImpressaoServico;

public class Main {

	public static void main(String[] args) {
		
		Traficante traffica = new Traficante();

		traffica.setSalario(300);
		
		List<Cliente> clientes = new ArrayList<>();
		
		Cliente cliente = new Cliente();
		cliente.setValor(200);
		cliente.setVipe(true);
		clientes.add(cliente);
		
		Cliente cliente1 = new Cliente();
		cliente1.setValor(100);
		cliente1.setVipe(true);
		clientes.add(cliente1);
		
		Cliente cliente2 = new Cliente();
		cliente2.setValor(400);
		cliente2.setVipe(false);
		clientes.add(cliente2);
		
		
		traffica.setClientes(clientes);
		
		ImpressaoServico servico = new ImpressaoServico();		
		servico.exibirDados(traffica);
		
	}

}
