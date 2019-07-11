/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.entity;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author tss
 */
@Entity
@NamedQueries({
	@NamedQuery(name="Condivisioni.getAll",query="select d from Condivisioni d WHERE d.utente.utente = :usr")
})
@Table(name="t_condivisioni")
public class Condivisioni implements Serializable {
 
    @Id
    @Column(name="id_condivisione")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;    
    
    
    @ManyToOne()
    @JoinColumn(name = "id_utente",  referencedColumnName = "id_utente")
    private Utente utente;
    

    @ManyToOne()
    @JoinColumn(name = "id_file", referencedColumnName = "id_file")
    private Documento doc;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public Documento getDoc() {
        return doc;
    }

    public void setDoc(Documento doc) {
        this.doc = doc;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 11 * hash + this.id;
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Condivisioni other = (Condivisioni) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }
    
    
}
