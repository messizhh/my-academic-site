// scripts.js

// 确保在 DOM 加载完毕后运行脚本
document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. 实时时钟 ---
  function updateLiveTime() {
    const dateEl = document.getElementById("live-date");
    const timeEl = document.getElementById("live-time");
    
    // (安全检查，如果不在首页，这些元素不存在，则退出)
    if (!dateEl || !timeEl) return; 

    const now = new Date();
    
    // 格式化日期 (例如: "2025年10月26日 星期日")
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    dateEl.innerHTML = now.toLocaleDateString('zh-CN', dateOptions);

    // 格式化时间 (例如: "19:10:00")
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    timeEl.innerHTML = `${hours}:${minutes}:${seconds}`;
  }
  
  // --- 2. 一言 (Hitokoto) ---
  async function fetchHitokoto() {
    const textEl = document.getElementById("hitokoto-text");
    const fromEl = document.getElementById("hitokoto-from");

    if (!textEl || !fromEl) return; // (安全检查)

    try {
      // API 来源：https://hitokoto.cn/
      const response = await fetch('https://v1.hitokoto.cn/?c=i&c=d&c=k&encode=json');
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      
      textEl.innerHTML = `“${data.hitokoto}”`;
      fromEl.innerHTML = `-「 ${data.from_who || data.from} 」`;

    } catch (error) {
      console.error("Fetch Hitokoto failed:", error);
      textEl.innerHTML = "“生活，就是一种永恒沉重的努力。”";
      fromEl.innerHTML = "-「 默认 」";
    }
  }

  // --- 立即运行与定时任务 ---
  
  // 立即运行一次
  updateLiveTime();
  fetchHitokoto();
  
  // 每秒更新时钟
  setInterval(updateLiveTime, 1000);
  
  // 每 30 秒更新一次 "一言"
  setInterval(fetchHitokoto, 30000);

});