document.addEventListener('DOMContentLoaded', () => {
  let lastColor1 = 'rgba(255,255,255,1)';
  let lastColor2 = 'rgba(0,0,0,1)';
  let animationInterval;
  let angle = 0; 
  

document.getElementById('copyButton').addEventListener('click', function() {
        const input = document.getElementById('textToCopy');
        input.select();
        document.execCommand('copy');
        alert('Текст скопирован: ' + input.value);
    });

  document.getElementById('gradient').addEventListener('click', async function (event) {
      const x = event.clientX - this.getBoundingClientRect().left;
      const y = event.clientY - this.getBoundingClientRect().top;
   
      const { color1, color2 } = getColorFromCoordinates(x, y);
      lastColor1 = color1;
      lastColor2 = color2;
      
      await startLinearGradient();
  });

  function getColorFromCoordinates(x, y) {
      const r1 = Math.floor((x / window.innerWidth) * 255);
      const g1 = Math.floor((y / window.innerHeight) * 255);
      const b1 = Math.floor((Math.sin(x + y) + 1) * 127);

      const r2 = 255 - r1;
      const g2 = 255 - g1;
      const b2 = 255 - b1 + 100;

      let opacity1 = (x / window.innerWidth) * (y / window.innerHeight);
      let opacity2 = 1 - opacity1;
      opacity1 = Math.max(opacity1, 0.4).toFixed(2);
      opacity2 = Math.max(opacity2, 0.4).toFixed(2);

      return {
          color1: `rgba(${r1}, ${g1}, ${b1}, ${opacity1})`,
          color2: `rgba(${r2}, ${g2}, ${b2}, ${opacity2})`
      };
  }

  async function startLinearGradient() {
      // Clear any existing interval
      if (animationInterval) clearInterval(animationInterval);

      return new Promise((resolve) => {
          animationInterval = setInterval(() => {
              document.getElementById('gradient').style.background = `linear-gradient(${angle}deg, ${lastColor1}, ${lastColor2})`;
              angle = (angle + 1) % 360; 
              const input = document.getElementById('textToCopy');
              input.value = `background: linear-gradient(${angle}deg, ${lastColor1}, ${lastColor2})`
          }, 200); 
      });
  }
});
