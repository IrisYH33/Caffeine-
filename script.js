(function(){
  const DRINKS = { espresso: 60, americano: 150, cappuccino: 80 };
  const LIMIT = 400;
  const totalEl = document.getElementById('total');
  const progressEl = document.getElementById('progress');
  const messageEl = document.getElementById('message');
  const historyList = document.getElementById('historyList');
  const storageKey = 'caffeine-tracker-entries-v1';

  function loadEntries(){
    try { return JSON.parse(localStorage.getItem(storageKey) || '[]'); }
    catch(e){ return []; }
  }
  function saveEntries(entries){ localStorage.setItem(storageKey, JSON.stringify(entries)); }

  function computeTotal(entries){ return entries.reduce((s,e)=>s+e.mg,0); }

  function updateUI(entries){
    const total = computeTotal(entries);
    totalEl.textContent = total;
    const pct = Math.min(100, Math.round((total / LIMIT) * 100));
    progressEl.style.width = pct + '%';

    // color thresholds: <75% green, 75-100% orange, >100% red
    if(total <= LIMIT * 0.75){
      progressEl.style.background = 'linear-gradient(90deg,#7ee787,#38b000)';
      messageEl.textContent = '';
    } else if(total <= LIMIT){
      progressEl.style.background = 'linear-gradient(90deg,#ffd580,#ff8c00)';
      messageEl.textContent = `Approaching limit: ${Math.max(0, LIMIT - total)} mg left`;
    } else {
      progressEl.style.background = 'linear-gradient(90deg,#ff9b9b,#ff3b30)';
      messageEl.textContent = `Over the limit by ${total - LIMIT} mg — consider stopping for the day.`;
    }

    // history list
    historyList.innerHTML = '';
    if(entries.length === 0){
      const li = document.createElement('li');
      li.textContent = 'No entries yet';
      historyList.appendChild(li);
      return;
    }
    entries.slice().reverse().forEach(entry => {
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.textContent = `${entry.name} — ${entry.mg} mg`;
      const right = document.createElement('div');
      right.textContent = new Date(entry.t).toLocaleTimeString();
      li.appendChild(left); li.appendChild(right);
      historyList.appendChild(li);
    });
  }

  function addEntry(name, mg){
    const entries = loadEntries();
    entries.push({ name, mg, t: Date.now() });
    saveEntries(entries);
    updateUI(entries);
  }

  function resetAll(){
    localStorage.removeItem(storageKey);
    updateUI([]);
  }

  document.getElementById('espresso').addEventListener('click', ()=> addEntry('Espresso', DRINKS.espresso));
  document.getElementById('americano').addEventListener('click', ()=> addEntry('Americano', DRINKS.americano));
  document.getElementById('cappuccino').addEventListener('click', ()=> addEntry('Cappuccino', DRINKS.cappuccino));
  document.getElementById('reset').addEventListener('click', ()=> {
    if(confirm('Reset all logged caffeine for today?')) resetAll();
  });

  // init
  updateUI(loadEntries());
})();
