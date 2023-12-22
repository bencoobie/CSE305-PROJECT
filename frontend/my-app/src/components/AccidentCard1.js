import AccidentCard from './AccidentCard';
import React, { Component } from 'react'

function AccidentCard1() {
    const dizi = [
      ["Aydın Zafer Mh. 111.sk No:12", "18.12.2023", "35 AB 202"],
      ["Aydın Zafer Mh. 111.sk No:13", "19.12.2023", ""],
      ["Aydın Zafer Mh. 111.sk No:14", "20.12.2023", ""],
    ];
  
    return (
      <div>
        {dizi.map((row, i) => (
          <AccidentCard counter={i+1} location={row[0]} date={row[1]} plaka={row[2]} />
        ))}
      </div>
    );
  }
  
  export default AccidentCard1;
  //https://ui.shadcn.com/docs/components/dialog
  