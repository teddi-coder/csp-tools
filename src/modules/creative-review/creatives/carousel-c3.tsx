'use client';

import { useCarousel } from '../useCarousel';

const slides = [
  // Slide 1
  <div key={0} style={{position:'absolute',inset:0,background:'#f5f2eb',border:'6px solid #d6cfc2',borderRadius:10,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}><div style={{color:'#1a1614',fontSize:27,fontWeight:700,lineHeight:'1.2'}}>Two ways to plan your term.</div></div>,
  // Slide 2
  <div key={1} style={{position:'absolute',inset:0,background:'#f5f2eb',border:'6px solid #d6cfc2',borderRadius:10,padding:26,display:'flex',flexDirection:'column' as const,justifyContent:'center',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}><div style={{color:'#1a1614',fontSize:18,fontWeight:700,textAlign:'center',marginBottom:20}}>prep time</div><div style={{display:'flex',gap:12}}><div style={{flex:1,textAlign:'center'}}><div style={{color:'#b45309',fontSize:13,marginBottom:6}}>DIY</div><div style={{color:'#a32d2d',fontSize:18,textDecoration:'line-through'}}>your weekends</div></div><div style={{flex:1,textAlign:'center',borderLeft:'2px dashed #ccc5b5'}}><div style={{color:'#3b6d11',fontSize:13,marginBottom:6}}>Cyber Safe Classroom</div><div style={{color:'#3b6d11',fontSize:18}}>ready to teach</div></div></div></div>,
  // Slide 3
  <div key={2} style={{position:'absolute',inset:0,background:'#f5f2eb',border:'6px solid #d6cfc2',borderRadius:10,padding:26,display:'flex',flexDirection:'column' as const,justifyContent:'center',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}><div style={{color:'#1a1614',fontSize:18,fontWeight:700,textAlign:'center',marginBottom:20}}>AI literacy</div><div style={{display:'flex',gap:12}}><div style={{flex:1,textAlign:'center'}}><div style={{color:'#b45309',fontSize:13,marginBottom:6}}>DIY</div><div style={{color:'#a32d2d',fontSize:18}}>where do I start?</div></div><div style={{flex:1,textAlign:'center',borderLeft:'2px dashed #ccc5b5'}}><div style={{color:'#3b6d11',fontSize:13,marginBottom:6}}>Cyber Safe Classroom</div><div style={{color:'#3b6d11',fontSize:18}}>included</div></div></div></div>,
  // Slide 4
  <div key={3} style={{position:'absolute',inset:0,background:'#f5f2eb',border:'6px solid #d6cfc2',borderRadius:10,padding:26,display:'flex',flexDirection:'column' as const,justifyContent:'center',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}><div style={{color:'#1a1614',fontSize:18,fontWeight:700,textAlign:'center',marginBottom:20}}>curriculum mapping</div><div style={{display:'flex',gap:12}}><div style={{flex:1,textAlign:'center'}}><div style={{color:'#b45309',fontSize:13,marginBottom:6}}>DIY</div><div style={{color:'#a32d2d',fontSize:18}}>you do it</div></div><div style={{flex:1,textAlign:'center',borderLeft:'2px dashed #ccc5b5'}}><div style={{color:'#3b6d11',fontSize:13,marginBottom:6}}>Cyber Safe Classroom</div><div style={{color:'#3b6d11',fontSize:18}}>F&ndash;8, done</div></div></div></div>,
  // Slide 5
  <div key={4} style={{position:'absolute',inset:0,background:'#1d7a5c',border:'6px solid #15604a',borderRadius:10,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center',textAlign:'center' as const,fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}><div style={{color:'#fff',fontSize:25,fontWeight:700,lineHeight:'1.25'}}>One of these costs you every weekend.</div><div style={{color:'#bfe9da',fontSize:14,marginTop:14}}>free trial &rarr; cybersafetyproject.com</div></div>,
];

export function CarouselC3() {
  const { current, goTo, trackRef } = useCarousel(slides.length);

  return (
    <div style={{width:320,userSelect:'none'}}>
      <div ref={trackRef} style={{position:'relative',width:320,height:400,cursor:'grab'}}>
        {slides.map((slide, i) => (
          <div key={i} style={{display: i === current ? 'block' : 'none'}}>{slide}</div>
        ))}
      </div>
      <div style={{display:'flex',justifyContent:'center',gap:7,marginTop:14}}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{width:7,height:7,borderRadius:'50%',border:'none',padding:0,background: i === current ? '#1B1918' : '#bbb',cursor:'pointer'}}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
