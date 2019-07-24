<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Tags</title>

        <!-- Bootstrap CSS -->
        <c:import url="./includes/importh.jsp" />

    </head>

    <body>
        <main> <header>
                <c:import url="./includes/menu.jsp" />
            </header>
            <article>
                <div class="container" >
                    <table cellpadding="0" cellspacing="0" border="0"
                           class="dataTable table table-striped" id="tags">
                    </table>
                </div>
            </article>
            <footer>
                <c:import url="./includes/footer.jsp"/>
            </footer>
        </main>

        <c:import url="./includes/script.jsp" />
        <script src="./js/dataTables.altEditor.free.js"></script>
        <script src="./js/tags.js" type="module"></script>


    </body>
</html>
