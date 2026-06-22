export function WhiteboardComparison() {
  return (
    <div style={{width:340,background:'#f5f2eb',border:'6px solid #d6cfc2',borderRadius:6,padding:'18px 20px',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}>
      <div style={{textAlign:'center',color:'#1a1614',fontSize:20,fontWeight:700}}>Term planning, two ways</div>
      <div style={{textAlign:'center',color:'#8a7e6b',fontSize:11,margin:'3px 0 14px'}}>staff meeting, week 1</div>
      <table style={{width:'100%',borderCollapse:'collapse',fontSize:'12.5px'}}>
        <thead>
          <tr><th></th><th style={{borderBottom:'2px solid #1a1614',color:'#b45309',padding:5}}>DIY, every term</th><th style={{borderBottom:'2px solid #1a1614',color:'#3b6d11',padding:5}}>Cyber Safe Classroom</th></tr>
        </thead>
        <tbody>
          <tr><td style={{color:'#4a3f2f',padding:'7px 4px',borderBottom:'1px dashed #ccc5b5'}}>prep time</td><td style={{textAlign:'center',color:'#a32d2d',borderBottom:'1px dashed #ccc5b5',textDecoration:'line-through'}}>your weekends</td><td style={{textAlign:'center',color:'#3b6d11',borderBottom:'1px dashed #ccc5b5'}}>ready to teach</td></tr>
          <tr><td style={{color:'#4a3f2f',padding:'7px 4px',borderBottom:'1px dashed #ccc5b5'}}>mapping</td><td style={{textAlign:'center',color:'#a32d2d',borderBottom:'1px dashed #ccc5b5'}}>you do it</td><td style={{textAlign:'center',color:'#3b6d11',borderBottom:'1px dashed #ccc5b5'}}>F&ndash;8, done</td></tr>
          <tr><td style={{color:'#4a3f2f',padding:'7px 4px',borderBottom:'1px dashed #ccc5b5'}}>AI literacy</td><td style={{textAlign:'center',color:'#a32d2d',borderBottom:'1px dashed #ccc5b5'}}>where do I start?</td><td style={{textAlign:'center',color:'#3b6d11',borderBottom:'1px dashed #ccc5b5'}}>included</td></tr>
          <tr><td style={{color:'#4a3f2f',padding:'7px 4px',borderBottom:'1px dashed #ccc5b5'}}>eSafety</td><td style={{textAlign:'center',color:'#a32d2d',borderBottom:'1px dashed #ccc5b5'}}>&#10007;</td><td style={{textAlign:'center',borderBottom:'1px dashed #ccc5b5'}}><span style={{color:'#3b6d11',border:'2px solid #3b6d11',borderRadius:'50%',padding:'1px 6px'}}>&#10003;</span></td></tr>
          <tr><td style={{color:'#4a3f2f',padding:'7px 4px'}}>incidents</td><td style={{textAlign:'center',color:'#a32d2d'}}>reactive</td><td style={{textAlign:'center',color:'#3b6d11'}}>fewer, proactive</td></tr>
        </tbody>
      </table>
      <div style={{textAlign:'center',color:'#1a1614',fontSize:13,marginTop:14}}>free trial &rarr; <span style={{textDecoration:'underline',textDecorationStyle:'wavy' as const,textDecorationColor:'#3b6d11'}}>cybersafetyproject.com</span></div>
    </div>
  );
}
