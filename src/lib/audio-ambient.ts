type SectionMap = Record<string, [number, number]>

const SECTION_TONICS: SectionMap = {
  inicio:    [55, 82.5],
  muebles:   [65.4, 98],
  servicios: [73.4, 110],
  blog:      [82.5, 123.5],
  testimonios: [82.5, 123.5],
  faq:       [98, 130.8],
}

export class AudioAmbient {
  private ctx: AudioContext | null = null
  private oscillators: OscillatorNode[] = []
  private filter: BiquadFilterNode | null = null
  private gain: GainNode | null = null
  private analyser: AnalyserNode | null = null
  private currentSection = 'inicio'

  private isReducedMotion(): boolean {
    if (typeof window === 'undefined') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  async init(): Promise<void> {
    if (this.ctx || this.isReducedMotion()) return

    this.ctx = new AudioContext()

    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.gain.connect(this.ctx.destination)

    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 60
    this.filter.Q.value = 0.5
    this.filter.connect(this.gain)

    const osc1 = this.ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55
    osc1.connect(this.filter)
    osc1.start()
    this.oscillators.push(osc1)

    const osc2 = this.ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 82.5
    osc2.connect(this.filter)
    osc2.start()
    this.oscillators.push(osc2)

    const t = this.ctx.currentTime
    this.gain.gain.setTargetAtTime(0.025, t, 1)
    this.filter.frequency.setTargetAtTime(80, t, 0.5)
  }

  setSection(section: string): void {
    if (!this.ctx || this.oscillators.length < 2) return

    this.currentSection = section
    const [f1, f2] = SECTION_TONICS[section] || [55, 82.5]
    const t = this.ctx.currentTime
    this.oscillators[0].frequency.setTargetAtTime(f1, t, 0.5)
    this.oscillators[1].frequency.setTargetAtTime(f2, t, 0.5)
  }

  setProgress(progress: number): void {
    if (!this.ctx || !this.filter || !this.gain) return

    const t = this.ctx.currentTime
    const freq = 60 + progress * 500
    this.filter.frequency.setTargetAtTime(freq, t, 0.3)
  }

  fadeOut(duration = 1.5): void {
    if (!this.ctx || !this.gain) return
    const t = this.ctx.currentTime
    this.gain.gain.setTargetAtTime(0, t, duration)
  }

  async fadeIn(duration = 1.5): Promise<void> {
    if (!this.ctx || !this.gain) return
    const t = this.ctx.currentTime
    this.gain.gain.setTargetAtTime(0.025, t, duration)
  }

  stop(): void {
    this.oscillators.forEach(osc => {
      try { osc.stop() } catch {}
    })
    this.oscillators = []
    if (this.ctx) {
      this.ctx.close()
      this.ctx = null
    }
  }
}
