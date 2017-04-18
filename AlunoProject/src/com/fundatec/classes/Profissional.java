package com.fundatec.classes;

import com.fundatec.interfaces.Salario;

public abstract class Profissional implements Salario{

	private double salario;

	public double getSalario() {
		return salario;
	}

	public void setSalario(double salario) {
		this.salario = salario;
	}
}
