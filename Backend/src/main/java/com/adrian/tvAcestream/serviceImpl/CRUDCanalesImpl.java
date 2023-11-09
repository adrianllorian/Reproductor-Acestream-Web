package com.adrian.tvAcestream.serviceImpl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.aop.target.SimpleBeanTargetSource;
import org.springframework.stereotype.Service;

import com.adrian.tvAcestream.modelo.Canal;
import com.adrian.tvAcestream.service.CRUDCanales;

@Service
public class CRUDCanalesImpl implements CRUDCanales {
	
	String listaM3U;

	@Override
	public boolean guardarCanales(List<Canal> listaCanales) {
		List<String> listaM3UCache = listaCanales.stream()
				.map(canal -> "#EXTINF:-1," + canal.getNombreCanal() + "\n" + "http://" + canal.getIpServidor() + "/ace/getstream?id=" + canal.getChannelId())
				.collect(Collectors.toList());

		listaM3U = "#EXTM3U\n" + String.join("\n", listaM3UCache);
		if (listaM3U.length()>1) {
			System.out.println("La lista m3u " + listaM3U);
			return true;
		}
		else {
			return false;
		}
		
	}

	@Override
	public String verCanales() {
		if (listaM3U.length()>1) {
			return listaM3U;
		}
		else {
			return null;
		}
	}
	

}
