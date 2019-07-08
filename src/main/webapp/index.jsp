<%-- 
    Document   : index
    Created on : 25-mar-2019, 9.13.44
    Author     : tss
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Cloud Storage</title>
        <c:import url="./includes/importh.jsp"/>
    </head>
    <body>
        <main>
            <header>
                <c:import url="./includes/menu.jsp"/>

            </header>
            <article>
                <div class="wrapper fadeInDown" id ="divLogin" style="display: none">
                    <div id="formContent">
                        <!-- Tabs Titles -->

                        <!-- Icon 
                        <div class="fadeIn first">
                            <img src="https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiq6vSE-5_jAhVOqaQKHbuTCvgQjRx6BAgBEAU&url=https%3A%2F%2Fjaki-jezyk-programowania.pl%2Ftechnologie%2Fc%2F&psig=AOvVaw0K6QJLW8SEkoMRUyTo3TYW&ust=1562491057483796" id="icon" alt="User Icon" />
                        </div>-->

                        <!-- Login Form -->
                        <!--<form method="POST" action="http://localhost:8080/cloud_st/resources/auth" onsubmit ="checkRegistration()">-->
                        <form>
                            <input type="text" id="utente" class="fadeIn second" name="usr" placeholder="utente">
                            <input type="text" id="password" class="fadeIn third" name="pwd" placeholder="password">
                            <input type="button" class="fadeIn fourth" value="Log In" id="tryLogin">
                            <span id="resp"></span>
                        </form>

                        <!-- Registra nuovo utente -->
                        <div id="formFooter">
                            <a class="underlineHover" href="${pageContext.request.contextPath}/registrazione.jsp">Registrati</a>
                        </div>

                    </div>
                </div>
            </article>
            <footer>
                <c:import url="./includes/footer.jsp"/>
            </footer>
        </main>

    </body>
    <script src="js/start.js" type="module"></script>
    <script src="js/login.js" type="module"></script>
</html>