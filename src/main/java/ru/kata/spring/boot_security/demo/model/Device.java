package ru.kata.spring.boot_security.demo.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS )
public class Device {

    @Id
    @GeneratedValue()
    public Integer id;

    private String name;

    private String type;

//    @OneToMany
//    private List<String> ipAddresses;

    @OneToMany
    private List<NetworkCard> networkCards;

    private String location;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getIpAddresses() {
        return ipAddresses;
    }

    public void setIpAddresses(List<String> ipAddresses) {
        this.ipAddresses = ipAddresses;
    }

    public List<NetworkCard> getNetworkCards() {
        return networkCards;
    }

    public void setNetworkCards(List<NetworkCard> networkCards) {
        this.networkCards = networkCards;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
