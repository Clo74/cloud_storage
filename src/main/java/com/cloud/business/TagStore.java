/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.business;

import com.cloud.entity.Tag;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 *
 * @author tss
 */
@Stateless
public class TagStore {
    
    @PersistenceContext
    EntityManager em;

    public Tag findById(Integer id) {
        return em.find(Tag.class, id);
    }

    public Tag save(Tag c) {
        return em.merge(c);
    }

    public void remove(Integer id) {
        em.remove(findById(id));
    }

    public List<Tag> findAll() {
        return em.createQuery("select t from Tag t order by t.tag", Tag.class)
                .getResultList();
    }

    
    
}
