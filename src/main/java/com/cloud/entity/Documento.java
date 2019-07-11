/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.cloud.entity;

import java.io.Serializable;
import java.util.Set;
import java.util.TreeSet;
import javax.json.bind.annotation.JsonbTransient;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OrderBy;
import javax.persistence.Table;

/**
 *
 * @author tss
 */
@Entity
@Table(name="t_files")
public class Documento implements Serializable {
    
    @Id
    @Column(name="id_file")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;    
    
    @Column(name="n_file")
    private String documento;
    
    @Column(name="titolo")
    private String titolo;

    @JsonbTransient
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_utente", referencedColumnName = "id_utente")
    private Utente utente;
    
    @ManyToMany
    @OrderBy("tag asc")
    @JoinTable(
            name = "t_tags_files",
            joinColumns = @JoinColumn(name = "id_file",
                    referencedColumnName = "id_file"),
            inverseJoinColumns = @JoinColumn(name = "id_tag",
                    referencedColumnName = "id_tag")
    )
    private Set<Tag> tags = new TreeSet<>();    

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDocumento() {
        return documento;
    }

    public void setDocumento(String documento) {
        this.documento = documento;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public Utente getUtente() {
        return utente;
    }

    public void setUtente(Utente utente) {
        this.utente = utente;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
    }

    @Override
    public int hashCode() {
        int hash = 7;
        hash = 29 * hash + this.id;
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
        final Documento other = (Documento) obj;
        if (this.id != other.id) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Documento{" + "id=" + id + ", documento=" + documento + ", titolo=" + titolo + ", utente=" + utente + ", tags=" + tags + '}';
    }
    
    
}
