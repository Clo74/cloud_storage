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
                    <div class="form-group">
                        <input type="text" id="titolo" name="titolo" class="form-control" placeholder="Inserisci un titolo" style="width: 500px">
                    </div>
                    <div class="form-group">
                        <input type="file" id="file" name="file" class="form-control-file">
                    </div>
                    <div class="form-group">
                        <input type="button" value="Carica File" class="btn btn-primary" id="butSendFile">
                    </div>
                </form>
                <hr>
                <button id="butGetFile">Leggi il documento</button> <span id="nameDoc"></span>
                <div id="contFile"></div>
                <hr>
                <div class="container" >
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="dataTable table table-striped" id="documenti" style="width: 100%">
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
