'use client'

import { motion } from 'framer-motion';
import { Typography } from "@mui/material";
import { Grid, Paper, Chip } from '@mui/material';
import Image from 'next/image';

const MotionPaper = motion(Paper);

export default function Home() {
  return (
    <Grid container>
      <video autoPlay loop muted style={{ position: "absolute", top: 0, left: 0, width: '100%', height: '100%', objectFit: "initial" }}>
        <source src="/video/land.mp4" type="video/mp4" />
        </video>
    <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '100vh' }}>
      <Grid item xs={8} sx={{mx: 'auto', textAlign: 'center', height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
  <Typography className='outfit primarytext' sx={{ fontSize:'10vw', textAlign: 'center', justifyContent:'center'}}>transformers</Typography>
  <Chip label='discover' className='primarytext urbanist p-5 rounded-lg' sx={{ position: 'absolute', bottom: '15%', fontSize:'2vw'}}>
  </Chip>
</Grid>
      <Grid item xs={4} sx={{mx: 'auto', textAlign: 'center', height:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        
      </Grid>
    </Grid>
    <Grid container sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '100vh' }}>
    <Grid container direction="column" xs={7} sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '100vh' }}>
      <Grid item xs={5} sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Typography className="youngserif" sx={{fontSize: '7vh'}}><span className="underline">rolling out</span> innovation</Typography>
      </Grid>
      <Grid item xs={7} sx={{ display:'flex', justifyContent:'center', alignItems:'center'}}>
      <Typography>hi</Typography>
      </Grid>
      </Grid>
      <Grid item xs={5} sx={{ display:'flex', justifyContent:'center', alignItems:'center', height: '100vh' }}>
      <MotionPaper 
          elevation={16} 
          className="rounded-3xl" 
          sx={{ position: 'relative', display:'flex', justifyContent:'center', alignItems:'center', width:'90%', height:'90%', overflow: 'hidden' }}
          whileHover={{ scale: 3, transition: { duration: 10 } }}
        >
          <video autoPlay loop muted style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
            <source src="/video/abstract3.mp4" type="video/mp4" />
          </video>
          <Typography 
            position="absolute" 
            className="fingerpaint secondarytext font-bold" 
            sx={{ fontSize: '19vw' }} 
          >
            .AI
          </Typography>
        </MotionPaper>
      </Grid>
    </Grid>
    </Grid>
  )
}