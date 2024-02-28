import  React, {useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(holeNumber, par, strokes, totalPar, totalStroke, currentScore) {
  return { holeNumber, par, strokes, totalPar, totalStroke, currentScore };
}


export default function BasicTable({postData}) {

  const [rows, setRows] = useState([]);
  const [totalPar, setTotalPar] = useState(0);
  const [totalStroke, setTotalStroke] = useState(0);

  useEffect(() => {
    // Reset totals and rows before calculating new ones
    setTotalPar(0);
    setTotalStroke(0);
    let newRows = [];
    let runningTotalPar = 0;
    let runningTotalStroke = 0;
    let currentScore = 0;

    postData.game_details.strokes.forEach((stroke, index) => {
      const holeNum = "Hole " + (index + 1);
      const par = parseInt(stroke.par, 10);
      const strokes = parseInt(stroke.strokes, 10);
      
      runningTotalPar += par;
      runningTotalStroke += strokes;
      currentScore = runningTotalStroke - runningTotalPar
      
      newRows.push(createData(holeNum, par, strokes, runningTotalPar, runningTotalStroke, currentScore));
    });

    // Update the state once with the final values
    setTotalPar(runningTotalPar);
    setTotalStroke(runningTotalStroke);
    setRows(newRows);
  }, [postData]);
  
  
  return (
    <TableContainer className='border-2 h-full' component={Paper}>
      <Table className='' aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Hole Number</TableCell>
            <TableCell align="right">Par</TableCell>
            <TableCell align="right">Strokes</TableCell>
            <TableCell align="right">Total Par</TableCell>
            <TableCell align="right">Total Strokes</TableCell>
            <TableCell align="right">Current Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.holeNumber}
              </TableCell>
              <TableCell align="right">{row.par}</TableCell>
              <TableCell align="right">{row.strokes}</TableCell>
              <TableCell align="center">{row.totalPar}</TableCell>
              <TableCell align="center">{row.totalStroke}</TableCell>
              <TableCell align="center">{row.currentScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}