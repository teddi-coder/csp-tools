'use client';

import { useCarousel } from '../useCarousel';

const slides = [
  // Slide 1
  <div key={0} style={{position:'absolute',inset:0,background:'#14213d',borderRadius:18,padding:32,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#fff',fontSize:25,fontWeight:600,lineHeight:'1.25'}}>What changed when schools stopped building it themselves.</div></div>,
  // Slide 2
  <div key={1} style={{position:'absolute',inset:0,background:'#f4f1ea',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#f4a300'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</div><div style={{color:'#1a2238',fontSize:21,fontWeight:500,lineHeight:'1.35',marginTop:12}}>&ldquo;A notable reduction in reports of online safety issues.&rdquo;</div><div style={{color:'#5f6473',fontSize:13,marginTop:14}}>Flinders Christian College</div></div>,
  // Slide 3
  <div key={2} style={{position:'absolute',inset:0,background:'#f4f1ea',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#f4a300'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</div><div style={{color:'#1a2238',fontSize:22,fontWeight:500,lineHeight:'1.35',marginTop:12}}>&ldquo;Not tech savvy? Not a problem.&rdquo;</div><div style={{color:'#5f6473',fontSize:13,marginTop:14}}>Steve Atkinson, Rangeview Primary</div></div>,
  // Slide 4
  <div key={3} style={{position:'absolute',inset:0,background:'#f4f1ea',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center'}}><div style={{color:'#f4a300'}}>&#9733;&#9733;&#9733;&#9733;&#9733;</div><div style={{color:'#1a2238',fontSize:21,fontWeight:500,lineHeight:'1.35',marginTop:12}}>&ldquo;A fantastic resource for all our staff.&rdquo;</div><div style={{color:'#5f6473',fontSize:13,marginTop:14}}>On the Educator Hub</div></div>,
  // Slide 5
  <div key={4} style={{position:'absolute',inset:0,background:'#0f9d76',borderRadius:18,padding:30,display:'flex',flexDirection:'column' as const,justifyContent:'center',textAlign:'center' as const}}><div style={{color:'#fff',fontSize:26,fontWeight:600}}>See it for your school</div><div style={{color:'#d6f5ec',fontSize:14,marginTop:10}}>eSafety endorsed. F&ndash;8.</div></div>,
];

export function CarouselC2() {
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
