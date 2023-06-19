package ru.kata.spring.boot_security.demo.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "Town")
public class Town {

    @Id
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "town")
    private List<Hospital> hospitals;

    public Town() {
    }

    public Town(Integer id, String name, List<Hospital> hospitals) {
        this.id = id;
        this.name = name;
        this.hospitals = hospitals;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Hospital> getHospitals() {
        return hospitals;
    }

    public void setHospitals(List<Hospital> hospitals) {
        this.hospitals = hospitals;
    }
}
