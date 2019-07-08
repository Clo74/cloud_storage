/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.services;

import com.cloud.business.TagStore;
import com.cloud.entity.Tag;
import java.net.URI;
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
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

/**
 *
 * @author tss
 */
@Path("/tags")
@RolesAllowed("users")
public class TagsResources {

    @Inject
    TagStore store;

    @GET
    public List<Tag> findAll() {
        return store.findAll();
    }

    @GET
    @Path("{id}")
    public Tag find(@PathParam("id") int id) {
        return store.findById(id);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Tag create(Tag a, @Context UriInfo uriInfo) {
        Tag saved = store.save(a);
        return saved;
/*        URI uri = uriInfo.getAbsolutePathBuilder()
                .path("/" + saved.getId())
                .build();
        return Response.ok(uri).build();*/

    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("{id}")
    public void update(@PathParam("id") int id, Tag tag) {
        tag.setId(id);
        store.save(tag);
    }

    @DELETE
    @Path("{id}")
    public void delete(@PathParam("id") int id) {
        store.remove(id);
    }

    
}
