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
        <c:import url="./includes/importh.jsp" />

    </head>

    <body>
        <main> <header>
                <c:import url="./includes/menu.jsp" />
            </header>
            <article>
                <form>
                    <div class="row">
                        <div class="col">
                            <h3>Invia un documento nel cloud</h3>
                            <div class="form-group">
                                <input type="text" id="titolo" name="titolo" class="form-control" placeholder="Inserisci un titolo" >
                            </div>
                            <div class="row">
                                <div class="col">
                                    <input type="file" id="file" name="file" class="form-control-file allineati">

                                </div>
                                <div class="col">
                                    <div class="form-group">
                                        <input type="button" value="Carica File" class="btn btn-primary" id="butSendFile">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col">
                            <h3>Recupera un documento dal cloud</h3>
                            <div class="form-group">
                                <input type="text" id="nameDoc" class="form-control" placeholder="Selezione un documento dalla lista" >
                            </div>     
                            <div class="form-group">                            
                                <input type="button" id="butGetFile" value="Carica il documento" class="btn btn-primary"/> 
                            </div>
                            <div id="contFile"></div>

                        </div>
                    </div>
                </form>
                <hr>
                <div class="container" >
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="dataTable table table-striped" id="documenti" with="100%">
                    </table>
                </div>
            </article>
            <footer>
                <c:import url="./includes/footer.jsp"/>
            </footer>
        </main>

        <c:import url="./includes/script.jsp" />
        <script src="./js/dataTables.altEditor.free.js"></script>
        <script src="./js/documenti.js" type="module"></script>


    </body>
</html>
