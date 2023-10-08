import React, { useState, useEffect } from 'react';
import '/src/app/globals.css';
import { Grid, Box, Typography, Paper, Button, Skeleton, Card, Fab, Switch, ToggleButton, Slider } from '@mui/material';
import Image from 'next/image';
import { NavigateBefore } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';

interface Answer {
  text: string;
  key: string;
  val: string;
}

function valuetext(value: number) {
  return `${value}°C`;
}

export default function Results() {
  const [query, setQuery] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false); // Abro
  const [status, setStatus] = useState(null); // dsofpiopsdifpodsifopsdflksdjf
  const [answers, setAnswers] = useState<Answer[]>([]); 
  const handleClick = async () => {
    setLoading(true); 
    const response = await fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setId(data.id);
  };

  useEffect(() => {
    let intervalId: number | null;
  
    const getStatus = async () => {
      const response = await fetch(`http://localhost:8000/status/${id}`);
      const data = await response.json();
      setStatus(data.status);

      if (data.status === 'complete') {
        setLoading(false); // Set loading to false when the status is "complete"
        setAnswers(data.answer); // Set the answers when the status is "complete"
      }
    };
  
    if (id) {
      getStatus();
      intervalId = window.setInterval(getStatus, 5000); // Poll every 5 seconds
    }
  
    return () => {
      if (id) {
        getStatus();
        intervalId = window.setInterval(getStatus, 5000); // Poll every 5 seconds
      }
    };
  }, [id]);

  // Rest of your component

  return (
    <Grid container sx={{position:'absolute', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Grid item xs={12} sx={{display:'flex', position:'relative', height:'100%', justifyContent:'center', alignItems:'center'}}>
      <Box className='rounded-2xl' sx={{display: 'flex', position: 'absolute', height:'90vh', width:'95%', overflow: 'hidden',}}>
  <Image
    src='/images/abstract2.jpg' 
    layout='fill' 
    objectFit='cover' // use 'cover' to fill the box
    alt="Background Image" // always add alt text for accessibility
  />
  <Grid item xs={0.5} sx={{display:'flex', height:'100%', position:'relative'}}>
    </Grid>
  <Grid container xs={5} direction='column' sx={{display:'flex', height:'100%', zIndex:1, alignItems:'center',}}>
    <Grid item sx={{display: 'flex', justifyContent:'center'}} xs="auto">
      <Paper className="rounded-2xl textmain" elevation={24} sx={{marginTop:'8vh', display:'flex', height:'10vh', width:'43vh', position:'absolute', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
      <video autoPlay loop muted style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', }}>
              <source src="/videos/night.mp4" type="video/mp4" />
            </video>
  <Typography sx={{position:'absolute', fontSize:'3.5vh'}} className="textmain outfit font-extrabold">transformers <span className="textalt">|</span> <span className="textmain">vectordb</span></Typography>
  </Paper>
      </Grid>
      <Grid container direction="column" spacing={1} sx={{display:'flex', height: '100%', position: 'relative'}}>
    <input
      placeholder="Try it Out!" 
      className='outfit textmain font-bold resultsbg rounded-2xl drop-shadow-2xl' 
      style={{
        width: '100%', 
        height: '15vh',
        paddingLeft: '1vh',
        opacity: '0.85',
        fontSize: '2vh',
        marginTop: '35vh',
        border:2
      }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <Grid container sx={{marginTop:'5vh', alignItems:'center', display:'flex' }}spacing={2}>
  <Grid item sx={{justifyContent:'center', alignItems:'center', display: 'flex'}} xs={6}>
    <Fab 
      className="resultsbg shadow-2xl textmain outfit font-bold rounded-2xl" 
      sx={{border:2, height: '7vh', display:'flex', width: '50%'}} 
      onClick={() => {
        setQuery('');
        setId(null);
        setLoading(false);
        setStatus(null);
        setAnswers([]);
      }}
    >
      Reset
    </Fab>
  </Grid>
  <Grid direction="column" item sx={{justifyContent:'center', alignItems:'center', display: 'flex' }} xs={6}>
  <Fab
      className="resultsbg rounded-2xl shadow-2xl-white" 
      sx={{height: '7vh', display:'flex', width: '50%', justifyContent:'center', alignItems:'center',border:2}} 
      onClick={handleClick}
    >
      <NavigateBefore className='textmain font-bold' sx={{fontSize:'5vh'}}/>
    </Fab>
  </Grid>
</Grid>
<Grid container sx={{marginTop:'5vh', alignItems:'center', justifyContent:'center', display:'flex' }}spacing={2}>
<Slider
  defaultValue={10}
  getAriaValueText={valuetext}
  valueLabelDisplay="auto"
  step={1}
  marks
  min={5}
  max={15}
  sx={{height:'4vh', border:1, borderSpacing:-2}}
  className="textalt slidercol"
/>
</Grid>
</Grid>
      </Grid>
      <Grid container className='rounded-2xl' sx={{width:"100vh", display: 'flex', overflow: 'hidden', justifyContent:'center'}}>
  <Grid container xs={6.5} direction='row' sx={{width: '85vh', marginLeft:'5vh',marginTop:'8vh', display:'flex', height:'80%', position:'absolute', zIndex:2, overflow:'scroll'}}>
  <Grid container spacing={2} >
  {status === 'complete' && answers.map((answer, index) => (
    <Grid item key={index}>
      <Card className="resultsbg rounded-2xl shadow-2xl" sx={{display:'flex', height:'20vh', width:'100%', padding:'2vh'}}>
        <Grid sx={{display:'flex', width:'70%', alignItems:'start', position:'absolute', justifySelf:'end'}}></Grid>
        <Typography sx={{fontSize:'2vh', display: 'flex', position:'relative', justifyContent:'start'}} className="playfair textmain font-bold">{`${answer.text}`}</Typography>
        <Grid container direction='column' sx={{width:'30%', justifySelf:'end'}}>
        <Grid sx={{width:'100%', justifySelf:'center'}}xs={6}>
        <Typography sx={{fontSize:'1.5vh', display: 'flex', position:'relative', justifySelf:'end'}} className="outfit textemph font-black">{`Key: ${answer.key}`}</Typography>
        </Grid>
        <Grid sx={{width:'100%', justifySelf:'center'}}xs={6}>
        <Typography sx={{fontSize:'1.5vh', display: 'flex', position:'relative', justifySelf:'end'}} className="outfit textemph font-black">{`Value: ${answer.val}`}</Typography>
        </Grid>
        </Grid>
      </Card>
    </Grid>
  ))}
</Grid>
{loading && [...Array(5)].map((_, index) => (
  <Grid container justifyContent="center" alignItems="center" key={index} spacing={1}>
    <Skeleton variant="rounded" sx={{width:'50vh', height:'10vh', position: 'relative'}} />
  </Grid>
))}
      </Grid>
      </Grid>
      </Box>
    </Grid>
    </Grid>
  );
}