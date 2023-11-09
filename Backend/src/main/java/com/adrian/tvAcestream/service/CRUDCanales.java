package com.adrian.tvAcestream.service;

import java.util.List;

import com.adrian.tvAcestream.modelo.Canal;

public interface CRUDCanales {

	boolean guardarCanales(List <Canal> listaCanales);
	String verCanales();
}
