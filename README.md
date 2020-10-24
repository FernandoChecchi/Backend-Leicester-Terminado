# BACKEND LEICESTER

## Deploy On Vercel
https://backend-leicester.fernandochecchi.vercel.app/

<h2>Token</h2>
<p> Para cada token enviar un usuario </p>
 <ul>
         <li>Post register devuelve token (dura 6Hs)                                      --->  /auth/register</li>
         <li>Post login    devuelve token (dura 6Hs)                                        --->  /auth/login</li>
         <li>Get me    verifica si esta registrado                                         --->  /auth/me</li>
 </ul>
 
 <p> Modelo de Usuario:</br>
 {</br>
    "username": "Homero Simpmson",</br>
    "password": "Marge"</br>
}</p>

<h2>Calls</h2>
<p> Para todos los calls deben tener como Headers:</br>
     key: access-token  </br>
     value: token     </br>
 </p>    
  <ul>
        <li>Get todos los partidos Leicester (aprox 80)                                       --->  /api</li>
        <li>Get resultado ultimo partido Leicester                                            --->  /api/latest</li>
        <li>Get busca resultado de un partido Leicester por id (11111) o fecha (AAAA MM DD)   --->  /api/find/:id</li>
        <li>Get ultimos 10 partidos Leicester                                                 --->  /api/matches</li>
        <li>Get partidos de Leicester por un intervalo                                        --->  /api/interval/:start/:end</li>
        <li>Get puntos de Leicester por un rango de partidos                                  --->  /api/range/:start/:end</li>
        <li>Post partido de Leicester   (enviar modelo partido)                                                   --->  /api/add</li>
                 
    </ul>
   <p>  Modelo de Partido:</br>
 {</br>
    "idMatch": 55555,</br>
    "teamLocal": "Luton Town",</br> 
    "teamVisitor": "Leicester City",</br>
    "scoreLocal": 0,</br>
    "scoreVisitor": 15,</br>
    "competition": "Champions",</br>
    "gameWeek": 3,</br>
    "date": "25 Dec 2019"</br>
}</p>
