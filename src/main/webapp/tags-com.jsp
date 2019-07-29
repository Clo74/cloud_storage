<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.0.0/webcomponents-loader.js"></script>
        <title>Tags</title>

        <!-- Bootstrap CSS -->
        <c:import url="./includes/importh.jsp" />

    </head>

    <body>
        <main> <header>
                <c:import url="./includes/menu.jsp" />
            </header>
            <article>
                <div>
                    <input id="inTot"> 
                    <input id="inParz">
                    <button id="btCSize">Cambia prop</button>
                    <div>
                        <fill-size id="myFillSize"></fill-size>
                    </div>
                </div>  
                <div class="container" >
                    <my-hello></my-hello>
                </div>
            </article>
            <footer>
                <c:import url="./includes/footer.jsp"/>
            </footer>
        </main>


        <script src="./js/tags-com.js" type="module"></script>


    </body>
</html>
