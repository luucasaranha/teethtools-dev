export interface PatientMetric {
  genderCount: {
    empty: number,
    male: number,
    female: number
  },
  statusCount: {
    ativos: number,
    cancelados: number,
    outros: number,
    finalizado: number
  }
}
