/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.services;

import com.cloud.business.DocumentoStore;
import com.cloud.business.UtenteStore;
import com.cloud.entity.Documento;
import com.cloud.entity.Utente;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author tss
 */
@Path("/utenti")
@RolesAllowed("users")
public class UtentiResources {

    @Inject
    UtenteStore store;
    
    @Inject
    DocumentoStore docStore;

    @GET
    public List<Utente> findAll() {
        return store.findAll();
    }

    @GET
    @Path("{id}")
    public Utente find(@PathParam("id") int id) {
        return store.findById(id);
    }

    @GET
    @Path("/log")
    @PermitAll
    public Utente login(
            @HeaderParam("usr") String usr, 
            @HeaderParam("pwd") String pwd) {
        
        Optional<Utente> p = store.login(usr, pwd);
        
        System.out.println("utente loggato --> " + p.get());
        
        return p.get();
    }
        
    
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response create(Utente a, @Context UriInfo uriInfo) {
        Utente saved = store.save(a);
        URI uri = uriInfo.getAbsolutePathBuilder()
                .path("/" + saved.getId())
                .build();
        return Response.ok(uri).build();

    }


    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public void update(@PathParam("id") int id, Utente utente) {
        utente.setId(id);
        store.save(utente);
    }

    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") int id) {
        store.remove(id);
    }
    
    //Documenti
    
    @GET
    @Path("{id}/documenti")
    public List<Documento> findDocAll(@PathParam("id") int id) {
        return docStore.findByUt(id);
    }


}
