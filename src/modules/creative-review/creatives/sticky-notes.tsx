export function StickyNotes() {
  return (
    <div style={{position:'relative',width:330,height:380,background:'#2c2825',borderRadius:8,border:'7px solid #3a342f',fontFamily:"'Segoe Print','Comic Sans MS','Marker Felt',cursive"}}>
      <div style={{position:'absolute',top:12,left:0,right:0,textAlign:'center',color:'#cbb89a',fontSize:12}}>why our school switched &darr;</div>
      <div style={{position:'absolute',top:42,left:20,width:130,background:'#fef08a',padding:'12px 10px',borderRadius:2,boxShadow:'2px 3px 6px rgba(0,0,0,0.25)',transform:'rotate(-3deg)',color:'#422006',fontSize:14,lineHeight:'1.3'}}>no more Sunday prep</div>
      <div style={{position:'absolute',top:48,right:20,width:130,background:'#a5f3fc',padding:'12px 10px',borderRadius:2,boxShadow:'2px 3px 6px rgba(0,0,0,0.25)',transform:'rotate(2.5deg)',color:'#083344',fontSize:14,lineHeight:'1.3'}}>AI literacy: sorted</div>
      <div style={{position:'absolute',top:166,left:26,width:138,background:'#86efac',padding:'12px 10px',borderRadius:2,boxShadow:'2px 3px 6px rgba(0,0,0,0.25)',transform:'rotate(2deg)',color:'#052e16',fontSize:14,lineHeight:'1.3'}}>mapped to the curriculum</div>
      <div style={{position:'absolute',top:174,right:22,width:126,background:'#fda4af',padding:'12px 10px',borderRadius:2,boxShadow:'2px 3px 6px rgba(0,0,0,0.25)',transform:'rotate(-2.5deg)',color:'#4c0519',fontSize:14,lineHeight:'1.3'}}>kids actually get it</div>
      <div style={{position:'absolute',bottom:48,left:'50%',transform:'translateX(-50%) rotate(1.5deg)',width:140,background:'#fed7aa',padding:'12px 10px',borderRadius:2,boxShadow:'2px 3px 6px rgba(0,0,0,0.25)',color:'#431407',fontSize:14,lineHeight:'1.3',textAlign:'center'}}>free to trial ☺</div>
      <div style={{position:'absolute',bottom:10,left:0,right:0,textAlign:'center',color:'#9a8a72',fontSize:11,fontFamily:'Arial,sans-serif'}}>cybersafetyproject.com</div>
    </div>
  );
}
