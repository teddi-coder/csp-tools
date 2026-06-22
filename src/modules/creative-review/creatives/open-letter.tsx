export function OpenLetter() {
  return (
    <div style={{position:'relative',width:320,transform:'rotate(-1deg)'}}>
      <div style={{background:'#fefcf3',borderRadius:3,boxShadow:'2px 3px 12px rgba(0,0,0,0.12)',overflow:'hidden'}}>
        <div style={{height:5,background:'#1d9e75'}}></div>
        <div style={{padding:'22px 22px 26px',fontFamily:'Georgia,serif'}}>
          <div style={{fontSize:10,letterSpacing:2,color:'#1d9e75',fontWeight:'bold',marginBottom:12}}>AN OPEN LETTER</div>
          <div style={{fontSize:20,color:'#2a2218',marginBottom:4}}>Dear teachers,</div>
          <div style={{fontSize:13,color:'#6a5f4f',fontStyle:'italic',marginBottom:12}}>You were never meant to build this alone.</div>
          <div style={{fontSize:'12.5px',color:'#4a3f2f',lineHeight:'1.55'}}>
            <p style={{margin:'0 0 10px'}}>Every term, somewhere, a teacher opens a blank document on a Sunday night and tries to invent a unit on online safety. And now AI literacy on top.</p>
            <p style={{margin:'0 0 10px'}}>That was never the job. You teach. Building a whole curriculum from scratch is not teaching. It is unpaid overtime.</p>
            <p style={{margin:'0 0 10px'}}><span style={{background:'#fef08a',padding:'1px 3px'}}>So we built it for you. Cyber Safe Classroom: ready-to-teach lessons, F to 8, mapped and eSafety endorsed.</span></p>
            <p style={{margin:0}}>Designed by educators who have stood where you stand. Try it free. Keep your Sundays.</p>
          </div>
          <div style={{borderTop:'1px solid #d8cfbb',margin:'14px 0 10px'}}></div>
          <div style={{fontSize:13,color:'#2a2218',fontStyle:'italic',fontWeight:'bold'}}>The team at Cyber Safety Project</div>
          <div style={{fontSize:12,color:'#1d9e75',fontFamily:'Arial,sans-serif',marginTop:6,textDecoration:'underline'}}>cybersafetyproject.com</div>
        </div>
      </div>
    </div>
  );
}
