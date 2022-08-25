//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.16;

contract Test{

    struct Person{
        uint adresa;
        string ime;
        string prezime;
    }

    Person[] public persons;

    constructor (){
        persons.push(Person(1,"Mihail","Jovanoski"));
        persons.push(Person(2,"Aleksa","Prokic"));
        persons.push(Person(3,"Zarko","Radenkovic"));
        persons.push(Person(4,"Marko","Mihailovic"));
        persons.push(Person(5,"Ivan","Jevtic"));
    }

    function dodajOsobu(uint _adresa, string memory _ime, string memory _prezime) public {
        persons.push(Person(_adresa, _ime, _prezime));
    }

    function getPeople() public view returns( uint[] memory, string[] memory, string[] memory){
        uint[] memory adr  = new uint[](persons.length);
        string[] memory imee = new string[](persons.length);
        string[] memory prez = new string[](persons.length);
        for(uint i=0; i < persons.length; i++)
        {
            Person storage pr = persons[i];
            adr[i] = pr.adresa;
            imee[i] = pr.ime;
            prez[i] = pr.prezime;
        }
        return (adr,imee,prez);
    }

    function obrisiOsobu(uint _adresa) public {
        uint index=100;
        for(uint i=0; i<persons.length; i++)
        {
            if(persons[i].adresa==_adresa){
                index = i;
                break;
            }
        }
        require(index<100);
        persons[index] = persons[persons.length - 1];
        persons.pop();
    }

}