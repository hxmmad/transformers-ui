'use client'

import { Grid, Typography, Box, Button } from '@mui/material'
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import PageviewIcon from '@mui/icons-material/PageviewRounded';
import React, { useState } from 'react';
import { useNavigation } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { NavigateBefore } from '@mui/icons-material';

export default function Home() {

  // Use the new useNavigation hook instead of useRouter


  const [ref, inView] = useInView({
    triggerOnce: false,
  });



  return (
    <Grid container>
    <Grid container sx={{display:'flex', height: '100vh'}}>
      <Grid container xs={12} sx={{display:'flex', height: '100%', position: 'relative'}}>
        <Grid container direction='column' xs={8} sx={{height: '100%', position: 'relative'}}>
          <Grid item xs={2} sx={{display:'flex', height: '100%', position: 'relative'}}>
          <Typography paddingLeft='10vh' paddingTop='10vh' sx={{
            fontSize: '3.5vh',
          }}
          className="textmain outfit">transformers</Typography>
            </Grid>
          <Grid item xs={10} sx={{display:'flex', height: '100%', position: 'relative', overflow: 'auto'}}>
          <motion.div
  ref={ref}
  initial={{ opacity: 0, x: -50 }}
  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
  transition={{ duration: 0.5 }}
>
  <Typography className="textmain playfair font-bold"
    paddingLeft='10vh' paddingTop='6vh' paddingRight='2vh' sx={{
      fontSize: '8vh',
    }}
  >
    Pushing the boundaries of innovation, we <span className="italic underline">roll out</span> generational AI products, focused on <span className="italic underline">transforming</span> the progression of humanity.
  </Typography>
</motion.div>
          </Grid>
          </Grid>
        <Grid item xs={4} sx={{display:'flex', justifyContent:'center', alignItems:'center', height: '100%', position: 'relative'}}>
          <Box className="rounded-2xl" sx={{transform: 'rotate(-24deg)', height:'80vh', width:'6vh', position: 'relative', overflow: 'hidden'}}>
            <video autoPlay loop muted style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
              <source src="/videos/abstract2.mp4" type="video/mp4" />
            </video>
          </Box>
          </Grid>
      </Grid>
    </Grid>
    <Grid container xs={12} sx={{display:'flex', height: '100vh'}}>
      <Grid container direction = 'column' xs={2} sx={{display:'flex', height: '100vh', position: 'relative', justifyContent:'center', alignItems:'center',}}>
      <Box className='rounded-2xl' sx={{display: 'flex',height:'80vh', width:'75%', position:'relative', overflow: 'hidden', justifyContent:'center', alignItems:'center'}}>
          <video autoPlay loop muted style={{ position: 'relative', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}>
              <source src="/videos/vector.mp4" type="video/mp4" />
            </video>
  <Typography className="outfit font-black textmain" sx={{transform: 'rotate(-90deg)', fontSize: '9vh', position:'absolute'}}>
    transformers
  </Typography>
          </Box>
        </Grid>
        <Grid container xs={10} direction='column' sx={{display:'flex', height: '100vh', position: 'relative', justifyContent:'center', alignItems:'center',}}>
        <Box className='rounded-2xl' sx={{display: 'flex',height:'80vh', width:'90%', position:'relative', overflow: 'hidden',}}>
  <Image 
    src='/images/bg.jpg' 
    layout='fill' 
    objectFit='cover' // use 'cover' to fill the box
    alt="Background Image" // always add alt text for accessibility
  />
  <Typography className="font-extrabold textmain playfair" paddingTop='5vh' paddingLeft='5vh' sx={{fontSize: '5vh', position:'absolute'}}>
    World Class.</Typography>
    <Box paddingTop='8vh'sx={{display: 'flex',height:'80vh', width:'50%', position:'absolute', overflow: 'auto',}}>
    <Typography className="font-extrabold textmain playfair" paddingTop='5vh' paddingLeft='5vh' sx={{fontSize: '5vh', position:'absolute'}}>
    Designed to impress.</Typography>
    </Box>

    <Box sx={{paddingRight: '5vh', paddingBottom: '8vh', display: 'flex',height:'100%', width:'100%', position:'absolute', overflow: 'hidden', justifyContent:'flex-end', alignItems: 'flex-end'}}>
  <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
  <Box sx={{ marginRight:'1vh', marginBottom:'20vh', position: 'relative', display: 'flex', alignItems: 'center', zIndex: 9999, overflow:'contain' }}>
  <Button
  className='rounded-2xl'
  variant="contained" 
  style={{ backgroundColor:'#F3EFE0', position: 'absolute', right: 0, top: 0, width:'30vh', height: '8vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
  <Link href="./results">
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography className='outfit textalt' sx={{fontSize: '3vh'}}>Try The Demo</Typography>
    </Box>
  </Link>
</Button>
</Box>
  </Box>
</Box>
    <Box sx={{justifyContent:'end', display: 'flex',height:'100%', width:'100%', position:'relative', overflow: 'hidden'}}>
    <Typography className='textmain martianmono font-extrabold' sx={{ marginRight:'5%', fontSize: '6vh', marginTop:'40vh'}}>transformers/vector<span className='font-black textemph'>db</span></Typography>
    </Box>
  </Box>
      </Grid>
    </Grid>
    </Grid>
  )
}