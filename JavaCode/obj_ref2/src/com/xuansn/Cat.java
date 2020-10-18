package com.xuansn;

public class Cat {
    private String cname;

    public Cat(String name) {
        this.cname = name;
    }
    public void call(){
        System.out.println("你好我叫"+this.cname);
    }
}
