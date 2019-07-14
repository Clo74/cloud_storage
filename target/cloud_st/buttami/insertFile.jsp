<%-- 
    Document   : insertFile
    Created on : 3-lug-2019, 15.07.29
    Author     : tss
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <!--    <form enctype="multipart/form-data" method="POST" action="http://localhost:8080/cloud_st/resources/documenti">-->
    <form onsubmit="caricaFile()">
        <input type="text" name="titolo">
        <br>
        <input type="file" name="file">
        <br>
        <input type="submit" value="Carica File">
    </form>

</html>
