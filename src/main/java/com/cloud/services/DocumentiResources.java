/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.services;

import com.cloud.business.DocumentoStore;
import com.cloud.entity.Condivisioni;
import com.cloud.entity.Documento;
import java.io.InputStream;
import java.util.List;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

/**
 *
 * @author tss
 */
@Path("/documenti")
@RolesAllowed("users")
public class DocumentiResources {

    @Inject
    DocumentoStore store;

    @GET
    public List<Documento> findAll() {
        return store.findAll();
    }

    @GET
    @Path("{id}")
    public Documento find(@PathParam("id") int id) {
        return store.findById(id);
    }

    
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadFile(
            @FormDataParam("file") InputStream is,
            @FormDataParam("file") FormDataContentDisposition cdh,
            @FormDataParam("titolo") String titolo) {
        System.out.println("file " + is + " titolo "+ titolo + " file name " + cdh.getFileName());
        Documento doc = new Documento();    
        doc.setTitolo(titolo);
        //doc.setDocumento(cdh.getFileName());
        doc.setDocumento(cdh.getFileName());
        store.save(doc, is);
        return Response.status(200).build();

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public Documento update(@PathParam("id") int id, Documento doc) {
        doc.setId(id);
        return store.saveUpd(doc);
    }

    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") int id) {
        store.remove(id);
    }
    
            //Documenti condivisi
    
    @GET
    @Path("/condivisi")
    public List<Condivisioni> findDocCond() {
        return store.findDocCond();
    }
    
    @GET
    @Path("download")
    public Response download(@QueryParam("name") String fileName) {
        
        Response.ResponseBuilder response = Response.ok(store.getFile(fileName));
    
        response.header("Content-Disposition","attachment; filename=\"" + fileName + "\"");  
    
        return response.build();
    }

}
