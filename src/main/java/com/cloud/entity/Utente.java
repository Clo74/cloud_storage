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
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;

/**
 *
 * @author tss
 */
@Entity
@NamedQueries({
	@NamedQuery(name="Utente.login",query="select e from Utente e WHERE e.utente= :user AND e.pwd= :pwd")
})
@Table(name="t_utenti")
public class Utente implements Serializable {
    
    @Id
    @Column(name="id_utente")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="cognome")
    private String cognome;
    
    @Column(name="nome")
    private String nome;

    @Column(name="utente")
    private String utente;
    
    @Column(name="pwd")
    private String pwd;
    
    @Column(name="e_mail")
    private String email;

       
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getUtente() {
        return utente;
    }

    public void setUtente(String utente) {
        this.utente = utente;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    
    @Override
    public int hashCode() {
        int hash = 5;
        hash = 43 * hash + this.id;
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
        final Utente other = (Utente) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Utente{" + "id=" + id + ", cognome=" + cognome + ", nome=" + nome + ", utente=" + utente + ", pwd=" + pwd + ", email=" + email + '}';
    }


    
    
    
}
