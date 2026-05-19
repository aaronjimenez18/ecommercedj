export interface Zone {
  name: string
  cost: number
  states: string[]
}

export const zones: Zone[] = [
  {
    name: 'Zona 1 (Centro)',
    cost: 100,
    states: [
      'CDMX',
      'Estado de México',
      'Morelos',
      'Hidalgo',
      'Puebla',
      'Tlaxcala',
      'Querétaro',
    ],
  },
  {
    name: 'Zona 2 (Bajío-Occidente)',
    cost: 200,
    states: [
      'Guanajuato',
      'Jalisco',
      'Michoacán',
      'Aguascalientes',
      'San Luis Potosí',
      'Zacatecas',
      'Colima',
      'Nayarit',
    ],
  },
  {
    name: 'Zona 3 (Resto del país)',
    cost: 350,
    states: [
      'Baja California',
      'Baja California Sur',
      'Chihuahua',
      'Coahuila',
      'Durango',
      'Nuevo León',
      'Sinaloa',
      'Sonora',
      'Tamaulipas',
      'Campeche',
      'Chiapas',
      'Guerrero',
      'Oaxaca',
      'Quintana Roo',
      'Tabasco',
      'Veracruz',
      'Yucatán',
    ],
  },
]

export function getZoneByState(state: string): Zone | undefined {
  return zones.find((z) =>
    z.states.some((s) => s.toLowerCase() === state.toLowerCase())
  )
}
