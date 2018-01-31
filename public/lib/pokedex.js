// window.onload = function() {}
//$(window).on('load', htmlCarregado);

$(window).ready(htmlPronto);

var base = 'https://cors.now.sh/https://pokeapi.co/api/v2/';

function htmlPronto() {
	carregarLista();
	$('.pesquisa').hide()
	$('#searchText').bind('keyup', function() {
   
    var searchString = $(this).val();

    $("ul li").each(function(index, value) {
        
        currentName = $(value).text()
        if( currentName.toUpperCase().indexOf(searchString.toUpperCase()) > -1) {
           $(value).show();
        } else {
            $(value).hide();
        }
        
    });
    
	});
}

function mostrarLoading() {
  $('#loading').show(200);
}
function esconderLoading() {
  $('#loading').hide(200);
}


function carregarLista(){
	mostrarLoading();

	var r = $.get(base + 'pokemon?limit=721');

	r.fail(function(){
		window.alert("Falha em carregar lista de Pokemons");
	});
	r.always(function(){
		esconderLoading();
	});
	r.done(montarLista);
}

function montarLista(dados){
	var imgModelo = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/NUMERO.png';

	var modelo = '<li data-numero="NUMERO"><img src="IMG"><span>NUMERO - NOME</span></li>';

	var html = '';
	for(var i in dados.results){
		var numero = parseInt(i) + 1;

		var img = imgModelo.replace('NUMERO', numero);

		html += modelo
		.replace('IMG', img)
		.replace('NUMERO', numero)
		.replace('NUMERO', numero)
		.replace('NOME', dados.results[i].name);

	}

	$("#lista").html(html);
	$('.pesquisa').show()
	$("#lista li").on("click", carregarPokemon);
}

function mostrarDetalhes(numero){
	$("#detalhes").hide('slow');
	mostrarLoading();
	var r = $.get(base + 'pokemon/'+numero);

	r.fail(function(){
		window.alert("Falha em carregar lista de Pokemons");
	});
	r.always(function(){
		esconderLoading();
	});
	r.done(montarDetalhes);
}

function montarDetalhes(res){

	
	let html = ''
	let detalhes = `<h1>#NUMERO - NOME</h1>
	<ul id="tipos">
	  <li>tipo1</li>
	  <li>tipo2</li>
	</ul>

	<div id="detBox">
	  <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/NUMEROFOTO.png" id="foto" />

	  <ul id="stats">
		<li>
		  <strong>stat1</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR1</span>
			<span class="statGrafico" style="width:STATVALOR1PORCENTAGEM%;"></span>
		  </span>
		</li>
		<li>
		  <strong>stat2</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR2</span>
			<span class="statGrafico" style="width:STATVALOR2PORCENTAGEM%;"></span>
		  </span>
		</li>
		<li>
		  <strong>stat3</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR3</span>
			<span class="statGrafico" style="width:STATVALOR3PORCENTAGEM%;"></span>
		  </span>
		</li>
		<li>
		  <strong>stat4</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR4</span>
			<span class="statGrafico" style="width:STATVALOR4PORCENTAGEM%;"></span>
		  </span>
		</li>
		<li>
		  <strong>stat5</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR5</span>
			<span class="statGrafico" style="width:STATVALOR5PORCENTAGEM%;"></span>
		  </span>
		</li>
		<li>
		  <strong>stat6</strong>
		  <span class="statItem">
			<span class="statValor">STATVALOR6</span>
			<span class="statGrafico" style="width:STATVALOR6PORCENTAGEM%;"></span>
		  </span>
		</li>

	  </ul>
	</div>`
	let tipo2 = ''
	if(res.types[1] != undefined){
		tipo2 = res.types[1].type.name.toUpperCase()
	}

	html += detalhes
			.replace('NUMERO', res.id)
			.replace('NUMEROFOTO', res.id)
			.replace('NOME', res.name.toUpperCase())
			.replace('tipo1', res.types[0].type.name.toUpperCase())
			.replace('tipo2', tipo2)
			.replace('stat1', res.stats[0].stat.name.toUpperCase())
			.replace('stat2', res.stats[1].stat.name.toUpperCase())
			.replace('stat3', res.stats[2].stat.name.toUpperCase())
			.replace('stat4', res.stats[3].stat.name.toUpperCase())
			.replace('stat5', res.stats[4].stat.name.toUpperCase())
			.replace('stat6', res.stats[5].stat.name.toUpperCase())
			.replace('STATVALOR1', res.stats[0].base_stat)
			.replace('STATVALOR1PORCENTAGEM', res.stats[0].base_stat)
			.replace('STATVALOR2', res.stats[1].base_stat)
			.replace('STATVALOR2PORCENTAGEM', res.stats[1].base_stat)
			.replace('STATVALOR3', res.stats[2].base_stat)
			.replace('STATVALOR3PORCENTAGEM', res.stats[2].base_stat)
			.replace('STATVALOR4', res.stats[3].base_stat)
			.replace('STATVALOR4PORCENTAGEM', res.stats[3].base_stat)
			.replace('STATVALOR5', res.stats[4].base_stat)
			.replace('STATVALOR5PORCENTAGEM', res.stats[4].base_stat)
			.replace('STATVALOR6', res.stats[5].base_stat)
			.replace('STATVALOR6PORCENTAGEM', res.stats[5].base_stat)
	esconderLoading();
	$("#detalhes").html(html)
	$("#detalhes").show('slow')
	$('html').scrollTop(0)
	html = '';

	console.log(res)
}

function esconderDetalhes(){
	$("#detalhes").hide('slow');
}

function carregarPokemon(){
	mostrarDetalhes($(this).data('numero'));
}
