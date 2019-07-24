<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Documenti</title>

        <!-- Bootstrap CSS -->
        <c:import url="./includes/importh.jsp"/>

    </head>

    <body>
        <main> <header>
                <c:import url="./includes/menu.jsp"/>
            </header>
            <article>
                <form>
                    <div class="row">
                        <div class="col">
                            <h3>Condividi i tuoi documenti</h3>
                            <div class="form-group" id="contSelect">
                                
                            </div>
                            <div class="form-group">
                                <label for="inUtente">Nome utente con cui vuoi condividere: </label>
                                <input id="inUtente" placeholder="utente" class="form-control">
                            </div>
                            <div class="form-group">
                                <input type="button" value="Condividi documento" class="btn btn-primary" id="butSendFile">
                            </div>
                        </div>
                        <div class="col">
                            <h3>Recupera un documento dal cloud</h3>
                            <div class="form-group"> 
                                <input type="text" id="utPropFile" readonly="readonly" class="form-control" placeholder="utente che ha condiviso con te..">
                            </div>
                            <div class="form-group"> 
                                <label for="docCond">Seleziona un documento dalla lista: </label>
                                <input type="text" id="docCond" readonly="readonly" class="form-control">
                            </div>
                            <input type="button" id="butGetFile" value="Carica il documento" class="btn btn-primary"/> 

                        </div>     
                    </div>
                </form>
                <hr>

                <div class="container" >
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="dataTable table table-striped" id="documenti" with="100%">
                        <caption>Documenti condivisi con te</caption>
                    </table>
                </div>
            </article>
            <footer>
                <c:import url="./includes/footer.jsp"/>
            </footer>
        </main>

        <c:import url="./includes/script.jsp" />
        <script src="./js/dataTables.altEditor.free.js"></script>
        <script src="./js/docCondivisi.js" type="module"></script>
    </body>
</html>
