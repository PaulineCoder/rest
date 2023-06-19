package ru.kata.spring.boot_security.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
public class NetworkCard {
    @Id
    @GeneratedValue()
    public Integer id;

    private String name;

    private String gateway;

//    private List<String> networkMusk;

//    private List<String> DNSServer;

//    private List<String> IPAddresses;
    private String MACAddress;
}
