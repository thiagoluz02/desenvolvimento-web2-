package com.fundatec.classes;

import java.util.ArrayList;
import java.util.List;

public class Traficante extends Profissional{

	private List<Cliente> clientes;

	private final double valorBase = 500;
	
	public List<Cliente> getClientes() {
		return clientes;
	}

	public void setClientes(List<Cliente> clientes) {
		this.clientes = clientes;
	}

	@Override
	public double calcularSalario() {

		double valorAcumulado = 0;
		int qtdVip = 0;
		
		for (Cliente cliente : clientes) {
			
			if(cliente.getVipe() && qtdVip < 10){
				qtdVip++;
				valorAcumulado += cliente.getValor();
			}
		}
		
		int quantidadeClientesTotal = clientes.size();
		
		this.setSalario((quantidadeClientesTotal * valorBase) + valorAcumulado);
		
		return getSalario();
	}
	
	
	public double getValorBase(){
		return this.valorBase;
	}
	
}
