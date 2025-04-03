export class MatrixRain {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private drops: number[] = [];
  private columns: number = 0;
  private fontSize: number = 14;
  private characters: string[] = [];
  private animationId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    this.ctx = context;
    
    // Matrix characters - use Japanese katakana and numbers
    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
    this.characters = matrixChars.split("");
    
    this.resizeCanvas();
    window.addEventListener('resize', this.resizeCanvas.bind(this));
    
    // Initialize drops
    this.initDrops();
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.columns = Math.floor(this.canvas.width / this.fontSize);
    
    // Re-initialize drops when canvas is resized
    this.initDrops();
  }

  private initDrops(): void {
    this.drops = [];
    for (let i = 0; i < this.columns; i++) {
      this.drops[i] = Math.random() * -this.canvas.height / this.fontSize;
    }
  }

  public start(): void {
    if (this.animationId !== null) {
      return; // Already running
    }
    
    const draw = () => {
      // Semi-transparent black to create fade effect
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.fillStyle = '#00FF41'; // Matrix green
      this.ctx.font = `${this.fontSize}px monospace`;
      
      // Draw characters
      for (let i = 0; i < this.drops.length; i++) {
        // Get random character
        const text = this.characters[Math.floor(Math.random() * this.characters.length)];
        
        // Draw the character
        this.ctx.fillText(text, i * this.fontSize, this.drops[i] * this.fontSize);
        
        // Randomly reset some drops to create varied effect
        if (this.drops[i] * this.fontSize > this.canvas.height && Math.random() > 0.975) {
          this.drops[i] = 0;
        }
        
        // Move drops down
        this.drops[i]++;
      }
      
      this.animationId = requestAnimationFrame(draw);
    };
    
    draw();
  }

  public stop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

export default MatrixRain;
