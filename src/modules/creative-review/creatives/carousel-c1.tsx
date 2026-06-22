'use client';

import { useCarousel } from '../useCarousel';

const slides = [
  // Slide 1
  <div key={0} style={{position:'absolute',inset:0,background:'#14213d',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#7d92c4',fontSize:12,letterSpacing:1}}>FOR TEACHERS</div><div style={{color:'#fff',fontSize:24,fontWeight:600,lineHeight:'1.25',marginTop:10}}>The online safety + AI unit you keep meaning to build.</div></div>,
  // Slide 2
  <div key={1} style={{position:'absolute',inset:0,background:'#1d3557',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#fff',fontSize:27,fontWeight:600}}>Ready-to-teach lessons.</div><div style={{color:'#8fd3c4',fontSize:20,fontWeight:500,marginTop:8}}>Foundation to Year 8.</div></div>,
  // Slide 3
  <div key={2} style={{position:'absolute',inset:0,background:'#14213d',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#fff',fontSize:27,fontWeight:600}}>AI literacy,</div><div style={{color:'#8fd3c4',fontSize:27,fontWeight:600}}>built in.</div></div>,
  // Slide 4
  <div key={3} style={{position:'absolute',inset:0,background:'#1d3557',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#fff',fontSize:24,fontWeight:600,lineHeight:'1.25'}}>Mapped to the Australian Curriculum.</div></div>,
  // Slide 5
  <div key={4} style={{position:'absolute',inset:0,background:'#0f9d76',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center',textAlign:'center' as const}}><div style={{color:'#fff',fontSize:27,fontWeight:600}}>Start your free trial</div><div style={{color:'#d6f5ec',fontSize:14,marginTop:10}}>Keep your Sundays.</div></div>,
];

export function CarouselC1() {
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
