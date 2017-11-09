// $(document).ready(function(){
//   if(pages.length === 0) return
//   pages.sort(function(a, b) {
//     console.log(pages);
//     return b.acessos - a.acessos;
//   })
//   $('#dsh-pagina_top_page').text(pages[0].pagina)
//   $('#dsh-pagina_top_views').text(pages[0].acessos)

const updateViewsList = function(pagina){
  let criaAcesso = true;
  $('.paginaAcessada').each(function(){
      if(pagina === $(this).text()){
        criaAcesso = false;
        return false;
      }else{
        return criaAcesso = true;
      };
  });
  if(criaAcesso){
    //console.log("nao ta na lista");
    $("#dsh-tabela-body").append(
      "<tr><td class='paginaAcessada'>"+pagina+"</td><td class='hitCounter'>0</td></tr>"
    )
    let paginasCriadas = parseInt($("#dsh-paginas-criadas").text());
    paginasCriadas++;
    $("#dsh-paginas-criadas").text(paginasCriadas);
  }
};
const updateViewsCounter = function(pagina){
  let topViews = 0
  $('.paginaAcessada').each(function(){
    if($(this).text() === pagina){
      var nextTdVal = parseInt($(this).next().text())
      nextTdVal++
      $(this).next().text(nextTdVal)
    }
  })
};
const updateTopView = function (){
  let paginaTop = $("#dsh-pagina_top_page").text();
  let paginaTopViews = parseInt($("#dsh-pagina_top_views").text());
}
const updateTopViewCounter = function(){
  let topViews = 0
  $('.paginaAcessada').each(function(){

    if(parseInt($(this).next().text()) > topViews){
      topViews = parseInt($(this).next().text());
      $("#dsh-pagina_top_views").text(topViews)
      $("#dsh-pagina_top_page").text($(this).text())
    }
  });
}
const updateTotalVis = function(){
  let totalVis = parseInt($("#dsh-visualizadas").text());
  totalVis++;
  $("#dsh-visualizadas").text(totalVis);
}

socket = io();
  socket.on('connect', function(){
    socket.on('acesso', function(acesso){
      
      updateViewsList(acesso);
      updateViewsCounter(acesso);
      updateTopView();
      updateTopViewCounter();
      updateTotalVis()

    });
  });
// })
