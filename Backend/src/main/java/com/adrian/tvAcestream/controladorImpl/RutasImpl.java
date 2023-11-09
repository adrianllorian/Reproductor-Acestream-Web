package com.adrian.tvAcestream.controladorImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.adrian.tvAcestream.modelo.Canal;
import com.adrian.tvAcestream.service.CRUDCanales;

@RestController
public class RutasImpl {

	@Autowired
	private CRUDCanales crud;

	@PostMapping(value = "/guardarCanales", consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Boolean> guardarCanales(@RequestBody List<Canal> listaCanales) {

		return new ResponseEntity<>(crud.guardarCanales(listaCanales), HttpStatus.OK);
	}

	@GetMapping("/verCanales.m3u")
	public ResponseEntity<String> verCanalesM3U() {
		// Lógica para generar el contenido del archivo M3U
		String contenidoM3U = crud.verCanales();

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.valueOf("text/plain")); // Tipo de contenido M3U

		return new ResponseEntity<>(contenidoM3U, headers, HttpStatus.OK);
	}

}
