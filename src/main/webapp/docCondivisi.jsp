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

                    <div class="form-group" id="contSelect">

                    </div>
                    <div class="form-group">
                        <label for="inMail">Inserisci la mail dell'utente con cui vuoi condividere il documento: </label>
                        <input id="inMail" placeholder="scrivi la mail">
                    </div>
                    <div class="form-group">
                        <input type="button" value="Condividi documento" class="btn btn-primary" id="butSendFile">
                    </div>
                </form>
                <hr>
                    
                <div class="container" >
                  <table cellpadding="0" cellspacing="0" border="0"
                           class="dataTable table table-striped" id="documenti" style="width: 100%">
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
