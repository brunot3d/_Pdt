const updateViewsList = function(pagina) {
  let criaAcesso = true;
  $('.paginaAcessada').each(function() {
    if (`/${pagina.pagina}` === $(this).text()) {
      criaAcesso = false;
      
      $("#" + pagina._id).next().text(parseInt($("#" + pagina._id).next().text()) + 1)
        return false;
      } else {
        return criaAcesso = true;
    };
  });
  if (criaAcesso) {
    $("#dsh-tabela-body").append(
      "<tr><td class='paginaAcessada' id='" + pagina._id + "'>/" + pagina.pagina + "</td><td class='hitCounter'>0</td></tr>"
    )
    $("#" + pagina._id).next().text(parseInt($("#" + pagina._id).next().text()) + 1);
    var paginasCriadas = parseInt($("#dsh-paginas-criadas").text());
    paginasCriadas++;
    $("#dsh-paginas-criadas").text(paginasCriadas)
  }
};

const updateTopView = function() {
  let paginaTop = $("#dsh-pagina_top_page").text();
  let paginaTopViews = parseInt($("#dsh-pagina_top_views").text());
}
const updateTopViewCounter = function() {
  let topViews = 0
  $('.paginaAcessada').each(function() {

    if (parseInt($(this).next().text()) > topViews) {
      topViews = parseInt($(this).next().text());
      $("#dsh-pagina_top_views").text(topViews)
      $("#dsh-pagina_top_page").text($(this).text())
    }
  });
}
const updateTotalVis = function() {
  let totalVis = parseInt($("#dsh-visualizadas").text());
  totalVis++;
  $("#dsh-visualizadas").text(totalVis);
}

$(document).ready(function() {
  socket = io();
  updateTopView();
  updateTopViewCounter();

  $("#clearHits").click(function() {
    socket.emit('clear-hitCounter')
  });

  $("#clearViews").click(function() {
    socket.emit('clear-views')
  });

  socket.on('acesso', function(acesso) {
    updateViewsList(acesso);
    updateTotalVis()
    updateTopView();
    updateTopViewCounter();
  });

  socket.on('clear-views-done', function(err, rmv) {
    if (err) return alert(err)
    $("#dsh-tabela-body").find("tr").remove();
    parseInt($("#dsh-visualizadas").text(0));
    $("#dsh-pagina_top_views").text(0)
    $("#dsh-pagina_top_page").text(0)
    $("#dsh-paginas-criadas").text(0)
  })

  socket.on('clear-counter-done', function(err, rmv) {
    if (err) return alert(err)
    console.log(rmv)
    $(".hitCounter").each(function(hits) {
      parseInt($(this).text(0));
    })
    parseInt($("#dsh-visualizadas").text(0))
    $("#dsh-pagina_top_views").text(0)
    $("#dsh-pagina_top_page").text(0)
  })

})
