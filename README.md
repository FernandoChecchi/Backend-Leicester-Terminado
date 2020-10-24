# BACKEND LEICESTER

## Deploy On Vercel
https://backend-leicester.fernandochecchi.vercel.app/

<h2>Calls</h2>
    <ul>
        <li>Get todos los partidos Leicester (aprox 80)                                       --->  /api</li>
        <li>Get resultado ultimo partido Leicester                                            --->  /api/latest</li>
        <li>Get busca resultado de un partido Leicester por id (11111) o fecha (AAAA MM DD)   --->  /api/find/:id</li>
        <li>Get ultimos 10 partidos Leicester                                                 --->  /api/matches</li>
        <li>Get partidos de Leicester por un intervalo                                        --->  /api/interval/:start/:end</li>
        <li>Get puntos de Leicester por un rango de partidos                                  --->  /api/range/:start/:end</li>
        <li>Post partido de Leicester          {
    "idMatch": 55555,
    "teamLocal": "Luton Town",
    "teamVisitor": "Leicester City",
    "scoreLocal": 0,
    "scoreVisitor": 15,
    "competition": "Champions",
    "gameWeek": 3,
    "date": "24 Sep 2019"
}                         --->  /api/add</li>
    </ul>