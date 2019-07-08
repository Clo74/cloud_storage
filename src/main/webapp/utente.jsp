<%-- 
    Document   : registrazione
    Created on : 4-lug-2019, 14.17.32
    Author     : tss
--%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>


<!DOCTYPE html>
<html>
    <head>
        <!--<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">-->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Registrazione</title>
        <c:import url="./includes/importh.jsp"/>
    </head>

    <body>
        <header>
            <c:import url="./includes/menu.jsp" />
        </header>
        <article>
            <div id="formContent">
                <form>

                    <div id="legend">
                        <legend class="">Gestisci il tuo utente</legend>
                    </div>
                    <div class="form-group">
                        <!-- Nome -->
                        <label class="control-label"  for="name">Nome</label>
                        <div class="controls">
                            <input type="text" id="name" name="name" placeholder="" class="input-xlarge">
                            <p class="help-block">Inserisci il tuo nome</p>
                        </div>
                    </div>
                    <div class="form-group">
                        <!-- Cognome -->
                        <label class="control-label"  for="surname">Cognome</label>
                        <div class="controls">
                            <input type="text" id="surname" name="surname" placeholder="" class="input-xlarge">
                            <p class="help-block">Inserisci il tuo cognome</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <!-- Username -->
                        <label class="control-label"  for="username">Username</label>
                        <div class="controls">
                            <input type="text" readonly="readonly" id="username" name="username" placeholder="" class="input-xlarge">
                            <p class="help-block">Non è possibile modificare lo username</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <!-- E-mail -->
                        <label class="control-label" for="email">E-mail</label>
                        <div class="controls">
                            <input type="text" id="email" name="email" placeholder="" class="input-xlarge">
                            <p class="help-block">Inserisci la tua E-mail</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <!-- Password-->
                        <label class="control-label" for="password">Password</label>
                        <div class="controls">
                            <input type="password" id="password" name="password" placeholder="" class="input-xlarge">
                            <p class="help-block">Inserisci una password</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <!-- Password -->
                        <label class="control-label"  for="password_confirm">Password (Confirm)</label>
                        <div class="controls">
                            <input type="password" id="password_confirm" name="password_confirm" placeholder="" class="input-xlarge">
                            <p class="help-block">Conferma la password</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <!-- Button -->
                        <div class="controls">
                            <input id="btReg" type="button"  value="Modifica i tuoi dati">
                            <input id="btDel" type="button"  value="Cancella il tuo utente">
                        </div>

                    </div>

                </form>

            </div>
        </article>
        <footer>
            <c:import url="./includes/footer.jsp"/>
        </footer>
        <!--<script src="js/registrazione.js" type="module"></script>-->
    </body>
</html>
