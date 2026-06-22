export function NotificationStack() {
  return (
    <div className="device-wrap" style={{width:300,background:'#0a0a0d',borderRadius:28,padding:9,fontFamily:"-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',sans-serif"}}>
      <div style={{background:'#15151c',borderRadius:20,padding:'14px 13px 18px'}}>
        <div style={{display:'flex',justifyContent:'space-between',fontSize:12,color:'#fff',fontWeight:600,padding:'0 4px 8px'}}><span>9:41</span><span>92%</span></div>
        <div style={{textAlign:'center',color:'#fff',padding:'6px 0 14px'}}><div style={{fontSize:12,opacity:0.8}}>Monday, Term 2</div><div style={{fontSize:54,fontWeight:300,lineHeight:1}}>9:41</div></div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          <div style={{background:'#26262c',borderRadius:13,padding:'10px 12px',display:'flex',gap:9}}><div style={{width:28,height:28,borderRadius:7,background:'#ff3b30',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>📅</div><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#fff',fontSize:12,fontWeight:600}}>Calendar</span><span style={{color:'#a0a0a8',fontSize:10}}>now</span></div><div style={{color:'#e4e4e8',fontSize:12}}>Term 2 starts today</div></div></div>
          <div style={{background:'#26262c',borderRadius:13,padding:'10px 12px',display:'flex',gap:9}}><div style={{width:28,height:28,borderRadius:7,background:'#ff9500',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>⏲</div><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#fff',fontSize:12,fontWeight:600}}>Reminders</span><span style={{color:'#a0a0a8',fontSize:10}}>7:30 am</span></div><div style={{color:'#e4e4e8',fontSize:12}}>Plan digital citizenship + AI lessons</div></div></div>
          <div style={{background:'#1d3a2a',border:'1px solid #2e6a48',borderRadius:13,padding:'10px 12px',display:'flex',gap:9}}><div style={{width:28,height:28,borderRadius:7,background:'#1d9e75',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontSize:13,fontWeight:700}}>CS</div><div style={{flex:1}}><div style={{display:'flex',justifyContent:'space-between'}}><span style={{color:'#fff',fontSize:12,fontWeight:600}}>Cyber Safe Classroom</span><span style={{color:'#a0a0a8',fontSize:10}}>7:31 am</span></div><div style={{color:'#d6f0e4',fontSize:12}}>Already sorted. Your F&ndash;8 lessons are ready to teach.</div></div></div>
        </div>
        <div style={{textAlign:'center',color:'#7a7a82',fontSize:11,marginTop:16}}>free trial &bull; cybersafetyproject.com</div>
      </div>
    </div>
  );
}
