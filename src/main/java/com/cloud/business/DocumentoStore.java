/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.business;

import com.cloud.Configuration;
import com.cloud.entity.Documento;
import com.cloud.entity.Utente;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.Principal;
import java.util.List;
import java.util.Optional;
import javax.annotation.PostConstruct;
import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.eclipse.microprofile.jwt.JsonWebToken;

/**
 *
 * @author tss
 */
@Stateless
public class DocumentoStore {

    @PersistenceContext
    EntityManager em;

    @Inject
    Principal principal;
    
    @Inject
    UtenteStore userStore;
    
        @Inject
        JsonWebToken token;
    
    //Utente logged;

    @PostConstruct
    public void init() {
        //logged = em.find(Utente.class, 1);

    }

    public Documento findById(Integer id) {
        return em.find(Documento.class, id);
    }

    public Documento saveUpd(Documento d) {
        
        Optional<Utente> user = userStore.findByUsername(principal.getName());
        Utente logged = user.orElseThrow(() -> new EJBException("utente non trovato: " + principal.getName()));
        d.setUtente(logged);
        return em.merge(d);
    }
    
    public Documento save(Documento d, InputStream is) {
        System.out.println("utente: " + principal.getName());
                System.out.println("token user: " + token.getName());
        //System.out.println("token email: " + token.getClaim(Claims.email.name()));
        Optional<Utente> user = userStore.findByUsername(principal.getName());
        Utente logged = user.orElseThrow(() -> new EJBException("utente non trovato: " + principal.getName()));
        d.setUtente(logged);
        Documento saved = em.merge(d);
        try {
            Files.copy(is, documentPath(saved.getDocumento()),
                    StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ex) {
            throw new EJBException("save document failed...");
        }
        return saved;
    }

    public void remove(Integer id) {
       Documento saved = findById(id);
        try {
            Files.delete(documentPath(saved.getDocumento()));
        } catch (IOException ex) {
            throw new EJBException("delete document failed...");
        }
        em.remove(saved);
    }

    public List<Documento> findAll() {
        System.out.println("utente --> " + principal.getName());
        return em.createQuery("select d from Documento d where d.utente.utente = :usr order by d.titolo", Documento.class)
                .setParameter("usr", principal.getName())
                .getResultList();
    }

    public List<Documento> findByUt(Integer idUt) {
        return em.createQuery("select d from Documento d where d.utente.id = :idUt order by d.titolo", Documento.class)
                .setParameter("idUt", idUt)
                .getResultList();
    }

    private Path documentPath(String name) {
        System.out.println(Configuration.DOCUMENT_FOLDER
                + principal.getName() + "/" + name);
        return Paths.get(Configuration.DOCUMENT_FOLDER
                + principal.getName() + "/" + name);
    }

}
