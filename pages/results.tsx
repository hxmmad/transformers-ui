import React, { useState, useEffect } from 'react';
import '/src/app/globals.css';
import { Grid, Box, Typography, Paper, Button, Skeleton, Card } from '@mui/material';
import Image from 'next/image';
import { NavigateBefore } from '@mui/icons-material';
import zIndex from '@mui/material/styles/zIndex';

export default function Results() {
  const [query, setQuery] = useState('');
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false); // Add this line
  const [status, setStatus] = useState(null);
  const [answers, setAnswers] = useState([]); // Add this line

  const handleClick = async () => {
    setLoading(true); // Set loading to true when the request starts
    const response = await fetch('http://localhost:8000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    setId(data.id);
  };

  useEffect(() => {
    let intervalId;
  
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
      intervalId = setInterval(getStatus, 5000); // Poll every 5 seconds
    }
  
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval when component unmounts or id changes
      }
    };
  }, [id]);

  // Rest of your component

  return (
    <Grid container sx={{position:'absolute', width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <Grid item xs={12} sx={{display:'flex', position:'relative', height:'100%', justifyContent:'center', alignItems:'center'}}>
      <Box className='rounded-2xl' sx={{display: 'flex', position: 'absolute', height:'90vh', width:'95%', overflow: 'hidden',}}>
  <Image sx={{zIndex:0}}
    src='/images/sand.jpg' 
    layout='fill' 
    objectFit='cover' // use 'cover' to fill the box
    alt="Background Image" // always add alt text for accessibility
  />
  <Grid item xs={0.5} sx={{display:'flex', height:'100%', position:'relative'}}>
    </Grid>
  <Grid container xs={4} direction='column' sx={{display:'flex', height:'100%', zIndex:1}}>
    <Grid item sx={{display: 'flex', justifyContent:'center'}} xs="auto">
      <Paper className="rounded-2xl textmain" elevation={24} sx={{marginTop:'8vh', display:'flex', height:'10vh', width:'43vh', position:'absolute', justifyContent:'center', alignItems:'center', overflow:'hidden'}}>
      <video autoPlay loop muted style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', }}>
              <source src="/videos/sunset.mp4" type="video/mp4" />
            </video>
  <Typography sx={{position:'absolute', fontSize:'3.5vh'}} className="textmain outfit font-extrabold">transformers <span className="textalt">|</span> <span className="textmain">vectordb</span></Typography>
  </Paper>
      </Grid>
      <Grid item xs={8} paddingTop='2vh' sx={{display:'flex', height: '70%', position: 'relative', justifyContent:'center', alignItems:'start'}}>
      <input 
      placeholder="Try it Out!" 
      className='outfit bgalt' 
      style={{
        marginTop: '30vh',
        width: '100%',
        height: '10vh',
        display: 'flex',
        paddingLeft: '1vh',
        opacity: '0.9',
        alignItems: 'start',
        fontSize: '2vh',
      }}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <Button className="bgalt rounded-none" sx={{marginTop:'30vh', height: '10vh'}} onClick={handleClick}>
      <NavigateBefore className='textalt font-bold' sx={{fontSize:'5vh'}}/>
    </Button>
      </Grid>
      </Grid>
      <Grid container xs={7.5} direction='column' sx={{marginLeft:'5vh',marginTop:'8vh', display:'flex', height:'100%', position:'relative', justifyContent:'start', alignItems:'center', zIndex:2, overflow:'auto'}}>
      {status === 'complete' && answers.map((answer, index) => (
  <Card key={index} className="bgalt" sx={{display:'flex', height:'20vh', width:'80vh'}}>
    <Typography>{`Key: ${answer.key}`}</Typography>
    <Typography>{`Value: ${answer.val}`}</Typography>
    <Typography>{`Text: ${answer.text}`}</Typography>
  </Card>
))}
        {loading && <Skeleton variant="rounded" sx={{width:'70vh', height:'30vh', position: 'absolute' }}></Skeleton>}
      </Grid>
      </Box>
    </Grid>
    </Grid>
  );
}