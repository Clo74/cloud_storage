/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.business;

import com.cloud.Configuration;
import com.cloud.entity.Utente;
import java.io.IOException;
import java.nio.file.Files;
import java.io.File;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import javax.ejb.EJBException;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.NonUniqueResultException;
import javax.persistence.PersistenceContext;

/**
 *
 * @author tss
 */
@Stateless
public class UtenteStore {

    @PersistenceContext
    EntityManager em;

    public Utente findById(Integer id) {
        return em.find(Utente.class, id);
    }

    public Optional<Utente> findByUsername(String usr) {
       try {
            Utente p = em.createQuery("select e from Utente e where e.utente = :usr", Utente.class)
                .setParameter("usr", usr)
                .getSingleResult();
            
            return Optional.of(p);
        } catch (NoResultException | NonUniqueResultException ex) {
            return Optional.empty();
        }
    }
    
    public Utente save(Utente c) {
        Utente saved = em.merge(c);
        Path path = Paths.get(Configuration.DOCUMENT_FOLDER + saved.getUser());
        if (Files.notExists(path, LinkOption.NOFOLLOW_LINKS)) {
            try {
                Files.createDirectory(path);
            } catch (IOException ex) {
                throw new EJBException("save user failed...");
            }
        }
        return saved;
    }

    public void remove(Integer id) {
      Utente saved = findById(id);
        em.createQuery("delete from Documento e where e.utente :usr")
                .setParameter("usr", saved)
                .executeUpdate();
        em.remove(saved);
        try {
            deleteDirectory(Paths.get(Configuration.DOCUMENT_FOLDER + saved.getUser()));
        } catch (IOException ex) {
            throw new EJBException("remove user failed...");
        }
    }

    public List<Utente> findAll() {
        return em.createQuery("select u from Utente u order by u.cognome", Utente.class)
                .getResultList();
    }

    public Optional<Utente> login(String user, String pwd) {
        try {
            System.out.println("utente: " + user + " pwd "+ pwd);
            //where e.utente :user and e.pwd :pwd
            Utente p = em.createNamedQuery("Utente.login", Utente.class)
                    .setParameter("user", user)
                    .setParameter("pwd", pwd)
                    .getSingleResult();
            return Optional.of(p);
        } catch (NoResultException | NonUniqueResultException ex) {
            return Optional.empty();
        }
    }
    
    private void deleteDirectory(Path path) throws IOException {
        Files.walk(path)
                .sorted(Comparator.reverseOrder())
                .map(Path::toFile)
                .forEach(File::delete);
    }
    
}
