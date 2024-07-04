import { useState } from 'react';
import { useLocation } from 'react-router';
import './addLeague.css'

export const AddLeague = () => {
    
    const location = useLocation().pathname
    
  const [fileContent, setFileContent] = useState('');
  const [divisionTable, setDivisionTable] = useState([]);
  const [dataSeason, setDataSeason] = useState({
    season: '',
    division: ''
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        setFileContent(content);
        let parser = new DOMParser();
        let doc = parser.parseFromString(content, 'text/html');

        const dataTable = doc.querySelectorAll('tr');
        let position = 0;
        let divisionTableTemp = [];
        for (let p of dataTable) {
          if (position > 0) {
            let team = p.children[2].textContent;
            let win = p.children[4].textContent;
            let tie = p.children[5].textContent;
            let lose = p.children[6].textContent;
            let goalsFavor = p.children[7].textContent;
            let goalsAgainst = p.children[8].textContent;
            let points = p.children[10].textContent;

            let positionSeason = {
              team,
              win,
              tie,
              lose,
              goalsFavor,
              goalsAgainst,
              points
            };

            divisionTableTemp.push(positionSeason);
          }

          position++;
        }
        setDivisionTable(divisionTableTemp);
      };
      reader.readAsText(file);
    }
  };

  const handleInputs = (event) => {
    const { id, value } = event.target;
    setDataSeason({ ...dataSeason, [id]: value });
  };

  const SaveTable = (event) => {
    event.preventDefault();

    const dataToSend = {
      season: dataSeason.season,
      division: dataSeason.division,
      table: divisionTable
    };

    fetch('http://localhost:4002/addLeague', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setFileContent('')
        setDivisionTable([])

      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  console.log(divisionTable)
  return (
    <div className='formLeague'>
      <input type="file" accept=".html" onChange={handleFileChange} />
      <form onSubmit={SaveTable}>
        <input
          type="number"
          className="w48"
          id="season"
          placeholder="Temporada '0000'"
          value={dataSeason.season}
          onChange={handleInputs}
          required
          />
        <input
          type="text"
          className="w48"
          id="division"
          placeholder="Division"
          value={dataSeason.division}
          onChange={handleInputs}
          required
          />
        <input type="submit" value="GUARDAR" />
      </form>
      {fileContent && (
        <div className='tableAdd'>
          <h2>Tabla</h2>
          <div className='position'>
                <div className='data'>Pos</div>
                <div className='team'>Equipo</div>
                <div className='data'>V</div>
                <div className='data'>E</div>
                <div className='data'>D</div>
                <div className='data'>GF</div>
                <div className='data'>GC</div>
                <div className='data'>PTS</div>
            </div>
          {divisionTable.map((p, index) => <div className='position' key={index}>
                <div className='data'>{index + 1}</div>
                <div className='team'>{p.team}</div>
                <div className='data'>{p.win}</div>
                <div className='data'>{p.tie}</div>
                <div className='data'>{p.lose}</div>
                <div className='data'>{p.goalsFavor}</div>
                <div className='data'>{p.goalsAgainst}</div>
                <div className='data'>{p.points}</div>
            </div>)}
        </div>
      )}
    </div>
  );
};